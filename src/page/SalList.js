import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';

import SalItem from './SalItem';
import good_css from "../css/good_css";
import ListFoot from "./ListFoot";
import Ajax from "../common/Ajax";

export default class SkuList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: true,//加载是否完成
            refreshing: false,//下拉加载
            skuArr: [],//存储数据
            showFoot:0,//显示第八加载
            formData:{//存储请求条件
                token:this.props.token,//登录token
                content:'',//输入内容
                type:3,//查权重
                page:1,//第一页
                page_size:10,//每页10条
                cap_type:2,//1：关键词 2：时间 3：频率
                entrance:''//查询入口方式 4：全部（默认） 1：电脑 2：手机 3：微信
            },
            del:false,
            delArr:[],
        };
        this.refreshData = this.refreshData.bind(this);
        this.delShow = this.delShow.bind(this);
        this.checkFun = this.checkFun.bind(this);
    }
    //请求数据
    fetchData = () => {
        const {formData} = this.state;
        console.log(formData);
        Ajax.post('http://jdchamgapi.chaojids.com/jd/ranking/seek',formData)
            .then((response) => {
                console.log(response);
                if(response.result==1){
                    let arrData = response.data||[];
                    let foot=0;
                    if(arrData.length===0||arrData.length<9){
                        foot=1;
                    }
                    this.setState({ skuArr:this.state.skuArr.concat(arrData),showFoot:foot});
                    arrData = null;
                }else{
                    if(response.result == 1065){
                        this.setState({showFoot:1 });
                    }else{
                        if(response.msg){
                            alert(response.msg);
                        }else{
                            alert('服务器响应超时');
                        }
                    }
                }
                this.setState({ ready: false, refreshing: false });
            }).catch((error) => {
            this.setState({
                formData:{
                    ...this.state.formData,
                    token:''
                },
                ready: false,
                refreshing: false
            },()=>{
                this.props.token_Del();
            });
            alert(error);
        });
    }
    //下拉加载
    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
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
    refreshData (type,content){
        if(type){
            this.setState({
                refreshing: true,
                formData:{
                    ...this.state.formData,
                    type:type||this.state.formData.type,
                    content:content||content==''?content:this.state.formData.content,
                    page:1
                },
                ready:true,
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
    //关键词时间等切换
    cap_type_change(cap_type){
        this.setState({
            formData:{
                ...this.state.formData,
                cap_type:cap_type||'',
                page:1,
            },
            ready:true,
            skuArr: [],
            showFoot:0,
        },()=>{
            this.refreshData()
        })
    }
    delShow(){
        if(this.state.skuArr.length){
            this.setState({
                del:!this.state.del,
                delArr:[]
            })
        }else{
            alert('没有可以删除的数据')
        }
    }
    //删除ajax
    deleteFun(){
        const {delArr} = this.state;
        let formData = {
            token:this.props.token,
            type:this.state.formData.type,
            id:delArr.join(',')
        };
        if(delArr.length){
            Ajax.post('http://jdchamgapi.chaojids.com/jd/ranking/delete-log',formData)
                .then((response) => {
                    if(response.result==1){
                        alert(response.msg);
                        this.setState({
                            delArr:[]
                        },()=>{
                            this.refreshData(this.state.formData.type);
                        });
                    }else{
                        if(response.msg){
                            alert(response.msg);
                        }else{
                            alert('服务器响应超时');
                        }
                    }
                }).catch((error) => {
            });
        }else{
            alert('请选择要删除的商品')
        }
    }
    //选择
    checkFun(item){
        let id = item.id;
        const {delArr,del} = this.state;
        if(!del){
            this.props.navigation.navigate('Sales',{
                item:item
            })
        }
        let arr = delArr.filter((val)=>val==id);//过滤下看看是否有
        if(arr.length){//有
            let arr1 = delArr.filter((val)=>val!=id);
            this.setState({
                delArr:arr1
            })
        }else{//没有
            let arr2 = delArr;
            arr2.push(id);
            this.setState({
                delArr:arr2
            })
        }
    }
    //下拉刷新
    _onRefresh(){
        this.refreshData(this.state.formData.type);
    }
    componentDidMount(){
        this.refreshData()
    }


    render() {
        const { navigate } = this.props.navigation;
        const { skuArr,showFoot,refreshing,ready,formData,del,delArr} = this.state;
        return (
            <View style={good_css.content}>
                <View style={good_css.heaTab}>
                    <Text style={[good_css.heaTabItem,formData.cap_type==2?good_css.active:{}]} onPress={()=>this.cap_type_change(2)}>时间</Text>
                    <Text style={[good_css.heaTabItem,formData.cap_type==3?good_css.active:{}]} onPress={()=>this.cap_type_change(3)}>频率</Text>
                </View>
                {ready ? <ActivityIndicator size="large" style={good_css.loadding}/>:<FlatList
                    data={skuArr}
                    refreshing={refreshing}
                    keyExtractor={(item,index)=>index.toString()}
                    onEndReachedThreshold={1}
                    onRefresh={this._onRefresh.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    ListFooterComponent={()=>ListFoot.RenderFooter(showFoot)}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={{flexDirection:'row',alignItems:'center'}}
                                onPress={()=>this.checkFun(item)}
                            >
                                {del?
                                    <View>
                                        {delArr.filter((val)=>val==item.id).length?
                                            <Image source={require('../img/xze2.png')} style={good_css.radio}/>:
                                            <Image source={require('../img/xze1.png')} style={good_css.radio}/>
                                        }
                                    </View>
                                    :null}
                                <SalItem item={item} data={skuArr} navigate={navigate} />
                            </TouchableOpacity>
                        );
                    }} />
                }

                {/*删除*/}
                {del?
                    <View style={good_css.bottomFix}>
                        <TouchableOpacity
                            style={{flexDirection:'row',alignItems:'center'}}
                            onPress={()=>{
                                if(skuArr.length==delArr.length){
                                    this.setState({
                                        delArr:[]
                                    })
                                }else{
                                    let arr = [];
                                    skuArr.map(val=>{arr.push(val.id)});
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
                                onPress={()=>this.setState({
                                    del:false
                                })}
                            >
                                <Text style={{fontSize:16,width:80,height:40,lineHeight:40,borderColor:'#999',borderWidth:1,color:'#999',borderRadius:8,textAlign:'center'}}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.deleteFun.bind(this)}
                            >
                                <Text style={{fontSize:16,width:80,height:40,lineHeight:40,backgroundColor:'#FF3851',color:'#fff',borderRadius:8,textAlign:'center',marginLeft:15}}>删除</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    :null}
            </View>
        );
    }
}