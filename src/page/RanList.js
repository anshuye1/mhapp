import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';

import RanItem from './RanItem';
import WeiItem from './WeiItem';
import SalItem from './SalItem';

import good_css from "../css/good_css";
import ListFoot from "./ListFoot";
import Ajax from "../common/Ajax";
import ToastShow from "../common/Toast";

export default class SkuList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,//加载是否完成
            refreshing: false,//下拉加载
            skuArr: [],//存储数据
            showFoot:0,//显示第八加载
            formData:{//存储请求条件
                token:props.token,//登录token
                content:'',//输入内容
                type:props.type,//查排名
                page:1,//第一页
                page_size:10,//每页10条
                cap_type:props.type*1-1||'',//1：关键词 2：时间 3：频率
                entrance:props.type==1?4:''//查询入口方式 4：全部（默认） 1：电脑 2：手机 3：微信
            },
            shadow:false,//显示端口pc、app等
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
        Ajax.post('/jd/ranking/seek',formData)
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
                            ToastShow.toastShort(response.msg);
                        }else{
                            ToastShow.toastShort('服务器响应超时');
                        }
                    }
                }
                this.setState({ ready: true, refreshing: false });
            }).catch((error) => {
            this.setState({
                formData:{
                    ...this.state.formData,
                    token:''
                },
                ready: true,
                refreshing: false
            },()=>{
                this.props.token_Del();
            });
            // ToastShow.toastShort(error);
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
    refreshData (type,content){//带type的话表示要初始化参数
        if(type){
            this.setState({//初始化参数
                refreshing: true,
                formData:{
                    ...this.state.formData,
                    type:type||this.state.formData.type,
                    content:content||content==''?content:this.state.formData.content,
                    page:1
                },
                ready:false,
                skuArr: [],
                showFoot:0,
                shadow:false
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
    //端口点击
    entranceFun (){
        this.setState({
            shadow:!this.state.shadow
        })
    }
    //阴影部分点击
    closeShadow (){
        this.setState({
            shadow:false
        })
    }
    //关键词时间等切换
    cap_type_change(cap_type,entrance){
        this.setState({
            formData:{
                ...this.state.formData,
                entrance:entrance||'',
                cap_type:cap_type||'',
                page:1,
            },
            ready:false,
            skuArr: [],
            showFoot:0,
            shadow:false
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
            ToastShow.toastShort('没有可以删除的数据')
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
        console.log(item.result);
        let urlObj = {
            1:{url:'Ranking',result:item.result?item.result[0]:''},
            2:{url:'Weight',result:item.result?item.result[0]:''},
            3:{url:'Sales',result:item},
        };
        console.log(item,type,urlObj[type]);
        if(!del){
            this.props.navigation.navigate(urlObj[type].url,{
                item:urlObj[type].result
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
    componentWillReceiveProps(nextProps){
        if(nextProps.token!==this.state.formData.token){
            this.setState({//初始化
                formData:{
                    ...this.state.formData,
                    token:nextProps.token,
                },
                ready: true,//加载是否完成
                refreshing: false,//下拉加载
                skuArr: [],//存储数据
                showFoot:0,//显示第八加载
                del:false,
                delArr:[],
            },()=>{
                this.refreshData()
            })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { skuArr,showFoot,refreshing,ready,formData,shadow,del,delArr} = this.state;
        let textObj = {'4':'端口',1:'pc',2:'app',3:'微信'};

        const hea = (
            <View style={good_css.heaTab}>

                {formData.type==1?//端口
                    <TouchableOpacity style={good_css.heaTabItem} onPress={this.entranceFun.bind(this)}>
                        <Text style={[{height:40,lineHeight:40,textAlign:'center',color:'#4A4A4A',},formData.entrance?good_css.active:{}]} >{textObj[formData.entrance]||'端口'} </Text>
                        {shadow? <Image source={require('../img/xla2.png')} style={{width:8,height:8}}/>:<Image source={require('../img/xla1.png')} style={{width:8,height:8}}/>}
                    </TouchableOpacity>
                    :null
                }

                {formData.type!=3?//关键词
                    <Text style={[good_css.heaTabItem,formData.cap_type==1?good_css.active:{}]} onPress={()=>this.cap_type_change(1)}>关键词</Text>
                    :null
                }

                <Text style={[good_css.heaTabItem,formData.cap_type==2?good_css.active:{}]} onPress={()=>this.cap_type_change(2)}>时间</Text>

                <Text style={[good_css.heaTabItem,formData.cap_type==3?good_css.active:{}]} onPress={()=>this.cap_type_change(3)}>频率</Text>

            </View>
        );

        return (
            <View style={good_css.content}>

                {hea}

                {!ready ? <ActivityIndicator size="large" style={good_css.loadding}/>:<FlatList
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
                                style={{flexDirection:'row',alignItems:'center',marginBottom:1}}
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
                                {formData.type==1?
                                    <RanItem item={item} data={skuArr} navigate={navigate} />
                                    :null
                                }
                                {formData.type==2?
                                    <WeiItem item={item} data={skuArr} navigate={navigate} />
                                    :null
                                }
                                {formData.type==3?
                                    <SalItem item={item} data={skuArr} navigate={navigate} />
                                    :null
                                }
                            </TouchableOpacity>
                        );
                    }} />
                }
                {shadow?
                    <TouchableOpacity onPress={this.closeShadow.bind(this)} style={good_css.wrapFix}><Text></Text></TouchableOpacity>
               :null
                }
                {shadow?
                    <View style={good_css.entranceWrap}>
                        <TouchableOpacity style={good_css.entrance} onPress={()=>{this.cap_type_change(0,4)}}>
                            <Text style={good_css.entranceFont}>全部</Text>
                            {formData.entrance==4?<Image style={good_css.dhImg} source={require('../img/dh1.png')}/>:null}
                        </TouchableOpacity>
                        <TouchableOpacity style={good_css.entrance} onPress={()=>{this.cap_type_change(0,1)}}>
                            <Text style={good_css.entranceFont}>pc</Text>
                            {formData.entrance==1?<Image style={good_css.dhImg} source={require('../img/dh1.png')}/>:null}
                        </TouchableOpacity>
                        <TouchableOpacity style={good_css.entrance} onPress={()=>{this.cap_type_change(0,2)}}>
                            <Text style={good_css.entranceFont}>app</Text>
                            {formData.entrance==2?<Image style={good_css.dhImg} source={require('../img/dh1.png')}/>:null}
                        </TouchableOpacity>
                        <TouchableOpacity style={good_css.entrance} onPress={()=>{this.cap_type_change(0,3)}}>
                            <Text style={good_css.entranceFont}>微信</Text>
                            {formData.entrance==3?<Image style={good_css.dhImg} source={require('../img/dh1.png')}/>:null}
                        </TouchableOpacity>
                    </View>
                    :null
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

