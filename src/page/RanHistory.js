import React, { Component } from 'react';
import { Text, View,FlatList,Image,Dimensions,TouchableOpacity,StyleSheet } from 'react-native';

import good_css from "../css/good_css";
import ListFoot from "./ListFoot";
import RanItem from "./RanItem";
import WeiItem from "./WeiItem";
import SalItem from "./SalItem";
import Loading from "../common/Loading";
import Ajax from "../common/Ajax";
import ToastShow from "../common/Toast";
import common_css from "../css/common_css";

export default class RanHistory extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props){
        super(props);
        const {state:{params:{token,type}}} = props.navigation;
        this.state = {
            ready: false,//加载是否完成
            refreshing: false,//下拉加载
            skuArr: [],//存储数据
            showFoot:0,//显示第八加载
            formData:{//存储请求条件
                token:token,//登录token
                type:type,//查排名
                page:1,//第一页
                page_size:10,//每页10条
            },
            del:false,
            delArr:[],
            total_page:2,
        }
    }
    //请求数据
    fetchData = () => {
        const {formData} = this.state;
        console.log(formData);
        Ajax.post('/jd/ranking/history-log',formData)
            .then((response) => {
                console.log(response);
                if(response.result==1){
                    let arrData = [];
                    response.data.map((item)=>{
                        if(formData.type==3){
                            item.service_id = item.id;
                        }
                        arrData.push(item);
                    });
                    let foot=0;
                    if(arrData.length===0||response.total_page<=formData.page){
                        foot=1;
                    }
                    this.setState({ skuArr:this.state.skuArr.concat(arrData),showFoot:foot,total_page:response.total_page});
                    arrData = null;
                }else{
                    if(response.result == 1065){
                        this.setState({showFoot:1 });
                    }else{
                        if(response.msg){
                            ToastShow.toastShort(response.msg+'31231');
                        }else{
                            ToastShow.toastShort('服务器响应超时');
                        }
                    }
                }
                this.setState({ ready: true, refreshing: false });
            }).catch((error) => {
            this.setState({
                ready: true,
                refreshing: false
            });
            console.log(error+'23423');
        });
    }
    //下拉加载
    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if(this.state.formData.page>=this.state.total_page){
            return ;
        }
        this.state.formData.page++;
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据，在componentDidMount()已经请求过数据了
        if (this.state.formData.page>1)
        {
            this.fetchData();//只调用ajax
        }
    }
    //请求数据
    refreshData (type){//带type的话表示要初始化参数
        if(type){
            this.setState({//初始化参数
                refreshing: true,
                formData:{
                    ...this.state.formData,
                    type:type||this.state.formData.type,
                    page:1
                },
                ready:false,
                del:false,
                skuArr: [],
                showFoot:0,
            },()=>{
                this.fetchData();
            })
        }else{
            this.setState({
                refreshing: true,
            },()=>{
                this.fetchData();
            });
        }
    }
    //下拉刷新
    _onRefresh(){
        this.refreshData(this.state.formData.type);
    }
    delShow(){
        if(this.state.skuArr.length){
            this.setState({
                del:!this.state.del,
                delArr:[]
            })
        }else{
            ToastShow.toastShort('没有可以删除的数据')
        }
    }
    //删除ajax
    deleteFun(){
        const {delArr,formData:{token,type}} = this.state;
        let formData = {
            token:token,
            type:type,
            id:delArr.join(',')
        };
        if(delArr.length){
            console.log(formData);
            Ajax.post('/jd/ranking/delete-log',formData)
                .then((response) => {
                    console.log(response);
                    if(response.result==1){
                        ToastShow.toastShort(response.msg);
                        this.setState({
                            delArr:[]
                        },()=>{
                            this.refreshData(this.state.formData.type);
                        });
                    }else{
                        if(response.msg){
                            ToastShow.toastShort(response.msg);
                        }else{
                            ToastShow.toastShort('服务器响应超时');
                        }
                    }
                }).catch((error) => {
            });
        }else{
            ToastShow.toastShort('请选择要删除的商品')
        }
    }
    //选择
    checkFun(item){
        let service_id = item.service_id;
        const {delArr,del,formData:{type}} = this.state;
        let ObjUrl = {
            1:'Ranking',
            2:'Weight',
            3:'Sales',
        };
        if(!del){
            console.log(this.props.navigation);
            this.props.navigation.state.params.setVal(item);
            this.props.navigation.navigate(ObjUrl[type],{
                item:item
            })
        }
        let arr = delArr.filter((val)=>val==service_id);//过滤下看看是否有
        if(arr.length){//有
            let arr1 = delArr.filter((val)=>val!=service_id);
            this.setState({
                delArr:arr1
            })
        }else{//没有
            let arr2 = delArr;
            arr2.push(service_id);
            this.setState({
                delArr:arr2
            })
        }
    }

    componentDidMount(){
        this.refreshData()
    }

    render() {
        const {goBack,navigate} = this.props.navigation;
        const { skuArr,showFoot,refreshing,ready,del,delArr,formData:{type}} = this.state;
        return (
            <View style={common_css.container1}>
                <View style={good_css.header}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:1}} onPress={()=>goBack()}>
                        <Image source={require('../img/fhui1.png')} style={{width:20,height:20,marginLeft:5}}/>
                    </TouchableOpacity>
                    <View style={good_css.header_wrap}>
                        <Text style={good_css.header_text}>历史记录</Text>
                    </View>
                    <TouchableOpacity  onPress={this.delShow.bind(this)} style={{flex:1}} >
                        <Text style={[good_css.header_text,{marginRight:15,textAlign:'right',fontSize:16}]}>{del?'取消':'编辑'}</Text>
                    </TouchableOpacity>
                </View>


                {ready ?
                    <FlatList
                    data={skuArr}
                    refreshing={refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    keyExtractor={(item,index)=>index.toString()}
                    onEndReachedThreshold={1}
                    onEndReached={this._onEndReached.bind(this)}
                    ListFooterComponent={()=>ListFoot.RenderFooter(showFoot)}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',marginBottom:1}}
                                onPress={()=>this.checkFun(item)}
                            >
                                {del?
                                    <View>
                                        {delArr.filter((val)=>val==item.service_id).length?
                                            <Image source={require('../img/xze2.png')} style={good_css.radio}/>:
                                            <Image source={require('../img/xze1.png')} style={good_css.radio}/>
                                        }
                                    </View>
                                    :null}
                                {type==1?<RanItem dataHis={item} navigate={navigate} />:null}
                                {type==2?<WeiItem dataHis={item} navigate={navigate} />:null}
                                {type==3?<SalItem dataHis={item} navigate={navigate} />:null}
                            </TouchableOpacity>
                        );
                    }} />
                    :null
                }

                {ready ?
                    null
                    :
                    <Loading />
                }

                {/*删除*/}
                {del?
                    <View style={good_css.bottomHisFix}>
                        <TouchableOpacity
                            style={{flexDirection:'row',alignItems:'center'}}
                            onPress={()=>{
                                if(skuArr.length==delArr.length){
                                    this.setState({
                                        delArr:[]
                                    })
                                }else{
                                    let arr = [];
                                    skuArr.map(val=>{arr.push(val.service_id)});
                                    this.setState({
                                        delArr:arr
                                    })
                                }
                            }}
                        >
                            {skuArr.length&&skuArr.length==delArr.length?
                                <Image source={require('../img/xze2.png')} style={good_css.radio}/>:
                                <Image source={require('../img/xze1.png')} style={good_css.radio}/>
                            }
                            <Text style={{fontSize:16}}>全选</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                onPress={this.deleteFun.bind(this)}
                            >
                                <Text style={{fontSize:16,width:80,height:40,lineHeight:40,backgroundColor:'#FF3851',color:'#fff',borderRadius:8,textAlign:'center'}}>删除</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    :null}
            </View>
        );
    }
}
