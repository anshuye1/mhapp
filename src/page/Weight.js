import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    TextInput,
    AsyncStorage,
} from 'react-native';

const {width,height} = Dimensions.get('window');


import Icon from 'react-native-vector-icons/FontAwesome';

import WeiItem from './WeiItem';
import MenuRan from './MenuRan';
import good_css from '../css/good_css';
import Ajax from "../common/Ajax";
import Loading from "../common/Loading";
import ToastShow from "../common/Toast";

const UrlStart = 'http://jdchamgapi.chaojids.com';

export default class Weight extends Component {
    constructor(props){
        super(props);
        const {state:{params:{item}}} = props.navigation;
        this.state={
            param:{},
            error:0,//0默认 1：成功 2：查询失败，有商品 3：查询失败无商品
            errorMsg:'',
            token:'',
            ready:true,
            formData:{
                keyword:item.keyword||'',
                sku:item.sku||'',
                weight_min:0,
                weight_max:200,
                price_min:item.price_max*1?item.price_min:'',
                price_max:item.price_max*1?item.price_max:'',
                service_id:'',
            },
            menuRan:false,//导航

        };
    }
    static navigationOptions = ({ navigation }) => ({
        header:null
    });

    //得到token
    getToken (){
        AsyncStorage.getItem('token').then((value) => {
            this.setState({
                token:value
            })
        });
    }
    //查询点击
    queryAjax(){
        let formData = this.state.formData;
        formData.token = this.state.token;
        console.log(formData,UrlStart);
        if(!formData.keyword){
            ToastShow.toastShort('请输入关键词');
            return false;
        }
        if(!formData.sku){
            ToastShow.toastShort('请输入sku或链接或店铺名');
            return false;
        }
        this.setState({
            ready:false
        });
        Ajax.post(UrlStart+'/jd/ranking/weight-search',formData)
            .then((response)=>{
                console.log(response);
                if(response.result==1){
                    console.log(response.data.sku_self.length);
                    this.setState({
                        param:response.data,
                        error:1,
                        errorMsg:response.data.sku_self&&response.data.sku_self.weight*1>0?'':'查询结果不在范围内'
                    })
                }else{
                    if(response.msg){
                        this.setState({
                            param:{},
                            error:2,
                            errorMsg:response.msg
                        })
                    }else{
                        this.setState({
                            param:{},
                            error:3,
                            errorMsg:'服务器响应超时，请手动刷新查询'
                        })
                    }
                }
                this.setState({
                    ready:true
                });
            })
            .catch((error)=>{
                this.setState({
                    ready:true,
                    param:{},
                    error:3,
                    errorMsg:'服务器响应超时，请手动刷新查询'
                });
                console.log(error);
            })
    }
    goSelf(){
        //先用measure测量出位置
        this.refs.self.measure((fx, fy, width, height, px, py) => {
            this.myScrollView.scrollTo({ x: 0, y: py-height-height, animated: true });
        });
    }

    //关闭导航
    closeMenu(){
        this.setState({
            menuRan:false
        })
    }

    componentDidMount(){
        this.getToken();
    }

    render() {
        const {goBack,navigate} = this.props.navigation;
        const {formData,ready,param,error,errorMsg,token,menuRan} = this.state;
        const data = param&&param.result?param.result:[];
        const sku_self = param&&param.sku_self?param.sku_self:{};
        let footer =error*1?
            (<View style={good_css.footer_view}>

                <View style={[good_css.foo_top_wrap]}>
                    <Text style={good_css.msg_text}>{errorMsg}</Text>
                    {error==3?
                        <TouchableOpacity onPress={this.queryAjax.bind(this)}><Text style={good_css.msg_btn}>一键刷新</Text></TouchableOpacity>
                        :null
                    }
                </View>

                <View style={good_css.foo_bom_wrap}>
                    <TouchableOpacity onPress={()=>navigate('Ranking',{
                        item:sku_self
                    })}>
                        <Text style={good_css.foo_bom_btn}>去查排名</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigate('Sales',{
                        item:sku_self
                    })}>
                        <Text style={[good_css.foo_bom_btn,good_css.foo_bom_btn1]}>去查销量</Text>
                    </TouchableOpacity>
                </View>
            </View>)
            :null;

        return (
            <View style={good_css.container}>

                <View style={good_css.header}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:1}} onPress={()=>goBack()}>
                        <Image source={require('../img/fhui1.png')} style={{width:25,height:25,marginLeft:5}}/>
                    </TouchableOpacity>
                    <View style={good_css.header_wrap}>
                        <Text style={good_css.header_text}>查权重</Text>
                    </View>
                    <View style={{justifyContent:'flex-end',flex:1,flexDirection:'row'}}>
                        <TouchableOpacity  onPress={()=>this.setState({
                            menuRan:true
                        })}>
                            <Image source={require('../img/flei2.png')} style={{width:25,height:25,marginRight:15}}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={good_css.headerBottom}>
                    <View style={good_css.search}>
                        <Icon style={good_css.searchIcon}
                              name="search"
                              size={18}
                              color="#8B8B8B" />
                        <TextInput
                            style={good_css.input}
                            multiline = {true}
                            numberOfLines={1}
                            placeholder="关键词"
                            value={formData.keyword}
                            onChangeText={(keyword) => this.setState({
                                formData:{
                                    ...formData,
                                    keyword:keyword
                                }
                            })}
                        />
                    </View>

                    <View style={good_css.search}>
                        <Icon style={good_css.searchIcon}
                              name="search"
                              size={18}
                              color="#8B8B8B" />
                        <TextInput
                            style={good_css.input}
                            multiline = {true}
                            placeholder="sku或商品链接"
                            value={formData.sku.toString()}
                            numberOfLines={1}
                            onChangeText={(sku) => this.setState({
                                formData:{
                                    ...formData,
                                    sku:sku
                                }
                            })}
                        />
                    </View>


                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                        <TouchableOpacity
                            style={good_css.query_btn}
                            onPress={this.queryAjax.bind(this)}
                        >
                            <Text style={good_css.query_btn_text}>查询</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={good_css.history_btn_wrap} onPress={()=>navigate('RanHistory',{
                            token:token,
                            type:2
                        })}>
                            <Text style={good_css.history_btn}>历史记录</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {ready?
                    <TouchableOpacity style={good_css.ran_hea} onPress={()=>{
                        this.myScrollView.scrollTo({ x: 0, y: 0, animated: true });
                    }}>
                        <Text style={good_css.ran_hea_left}>最新查询结果</Text>
                        <Text style={good_css.ran_hea_right}>{param.create_at}</Text>
                    </TouchableOpacity>
                    :null
                }
                {/*查询结果*/}
                <ScrollView
                    ref={(view) => { this.myScrollView = view; }}
                >
                    {ready?
                        <View>
                            {sku_self.weight?
                                <View style={{backgroundColor:'#fff',flexDirection:'column',marginBottom: 1}}>
                                    <WeiItem item1={sku_self} navigate={navigate} sku_self={sku_self?sku_self.id:''} goSelf={this.goSelf.bind(this)}/>
                                    {footer}
                                </View>
                                :footer
                            }
                            {data.length*1?data.map((item,index)=>{//有结果
                                return (
                                    <View key={index.toString()} style={[good_css.item_ran_wrap,sku_self&&sku_self.id&&sku_self.id==item.id?{backgroundColor:'#EAF4FF'}:{}]} ref={sku_self&&sku_self.id&&sku_self.id==item.id?'self':''}>
                                        <WeiItem item1={item} navigate={navigate}   />
                                    </View>
                                )
                            }): null//无结果
                            }
                        </View>
                        :null
                    }
                </ScrollView>
                {
                    ready?null:<Loading />
                }

                {menuRan?<MenuRan closeMenu={this.closeMenu.bind(this)} navigate={navigate} type={2}/>:null}
            </View>
        );
    }
}