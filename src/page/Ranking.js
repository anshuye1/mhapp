import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    ActivityIndicator,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Animated,
    Easing,
    AsyncStorage,
} from 'react-native';

const {width,height} = Dimensions.get('window');


import Icon from 'react-native-vector-icons/FontAwesome';

import Filter from './Filter';
import RanItem from './RanItem';
import MenuRan from './MenuRan';

import good_css from '../css/good_css';
import Ajax from "../common/Ajax";
import Loading from "../common/Loading";
import ToastShow from "../common/Toast";

const defaultVal = {
    entrance:'1',// 1：电脑端 2手机端 3微信端
    type:'1',//1：指定商品 2指定店铺
    sort:'1',//1：综合 2：销售 3：评论数 4：新品 5：价格
    price_min:'',
    price_max:'',
    page:1,
    page_size:50,
    service_id:'',
    city_id:'',//按地区查询
};

export default class Ranking extends Component {
    constructor(props){
        super(props);
        const {state:{params:{item}}} = props.navigation;
        this.state={
            filter:false,
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            data:[],
            error:0,//0默认 1：成功 2：查询失败，有商品 3：查询失败无商品
            errorMsg:'',
            cityArr:[],
            token:'',
            ready:true,
            formData:{
                keyword:item.keyword||'',
                sku:item.sku||'',
                entrance:item.entrance||item.client_type||defaultVal.entrance,// 1：电脑端 2手机端 3微信端
                type:item.type||defaultVal.type,//1：指定商品 2指定店铺
                sort:item.sort||defaultVal.sort,//1：综合 2：销售 3：评论数 4：新品 5：价格
                price_min:item.price_max*1?item.price_min:defaultVal.price_min,
                price_max:item.price_max*1?item.price_max:defaultVal.price_max,
                page:item.page_start||defaultVal.page,
                page_size:item.page_end||defaultVal.page_size,
                service_id:'',
                city_id:'',//按地区查询
            },
            menuRan:false,//导航
        };
    }
    static navigationOptions = ({ navigation }) => ({
        header:null
    });

    //显示动画
    in() {
        this.setState({
           filter:true
        });
        Animated.parallel([
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 1,
                }
            )
        ]).start();
    };
    //隐藏动画
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            )
        ]).start();
        setTimeout(()=>this.setState({filter: false}),200)
    }
    //确定点击
    submitFun(){
        this.out();
        this.setState({
            formData:{
                ...this.state.formData,
                ...this.refs.filter11.state.formData,
            }
        })
    }
    //城市
    cityAjax(){
        Ajax.post('/user/citys')
            .then((response)=>{
                console.log(response);
                if(response.result==1){
                    let arr=[];
                    response.data.map((item)=>{
                        arr.push(item)
                    });
                    this.setState({
                        cityArr:arr
                    })
                }else{
                    console.log(response.msg);
                }
            })
            .catch((error)=>{

            })
    }
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
        console.log(formData);
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
        Ajax.post('/jd/ranking/rank-search',formData)
            .then((response)=>{
                console.log(response);
                if(response.result==1){
                    this.setState({
                        data:response.data.result,
                        error:1,
                        errorMsg:response.msg||''
                    })
                }else{
                    if(response.msg){
                        this.setState({
                            data:[],
                            error:2,
                            errorMsg:response.msg
                        })
                    }else{
                        this.setState({
                            data:[],
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
                    data:[],
                    error:3,
                    errorMsg:'服务器响应超时，请手动刷新查询'
                });
                console.log(error);
            })
    }
    //关闭导航
    closeMenu(){
        this.setState({
            menuRan:false
        })
    }

    componentDidMount(){
        this.cityAjax();
        this.getToken();
    }

    render() {
        const {goBack,navigate} = this.props.navigation;
        const {filter,formData,cityArr,ready,data,error,errorMsg,token,menuRan} = this.state;
        const entranceObj = {
            '1':'pc端',
            '2':'app端',
            '3':'微信端',
        };
        const typeObj = {
            '1':'指定商品',
            '2':'指定店铺',
        };
        const sortObj = {
            1:'综合',
            2:'销售',
            3:'评论数',
            4:'新品',
            5:'价格'
        };
        let cityNameText = '';
        if(formData.city_id&&cityArr.length){
            let arr1 = cityArr.filter((item)=>item.id==formData.city_id);
            cityNameText = arr1.length?arr1[0].cityName:''
        }
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
                        <TouchableOpacity onPress={()=>navigate('Weight',{
                            item:data&&data.length?data[0]:''
                        })}>
                            <Text style={good_css.foo_bom_btn}>去查权重</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigate('Sales',{
                            item:data&&data.length?data[0]:''
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
                        <Text style={good_css.header_text}>查排名</Text>
                    </View>
                    <View style={{justifyContent:'flex-end',flex:1,flexDirection:'row'}}>
                        <TouchableOpacity  onPress={()=>this.in()}>
                            <Image source={require('../img/sxuan2.png')} style={{width:25,height:25,marginRight:20}}/>
                        </TouchableOpacity>
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

                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',marginBottom:10}}>
                        <Text style={[good_css.filterFont,good_css.filterFont1]}>{entranceObj[formData.entrance]}</Text>
                        <Text style={good_css.filterFont}>{typeObj[formData.type]}</Text>
                        <Text style={good_css.filterFont}>{sortObj[formData.sort]}</Text>
                        <Text style={good_css.filterFont}>{formData.page}-{formData.page_size}页</Text>
                        <Text style={good_css.filterFont}>{formData.price_min&&`${formData.price_min}-${formData.price_max}元`}</Text>
                        <Text style={good_css.filterFont}>{cityNameText}</Text>
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
                            type:1
                        })}>
                            <Text style={good_css.history_btn}>历史记录</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView>
                    {ready?
                        <View style={good_css.ran_hea}>
                            <Text style={good_css.ran_hea_left}>最新查询结果</Text>
                            <Text style={good_css.ran_hea_right}>{data[0]&&data[0].create_at}</Text>
                        </View>
                        :null
                    }

                    {ready?
                        (data.length?data.map((item,index)=>{//有结果
                            return (
                                <View key={index.toString()} style={{backgroundColor:'#fff',flexDirection:'column'}}>
                                    {index*1?<Text style={good_css.other_sku}>关联sku:</Text>:null}
                                    <RanItem item1={item} navigate={navigate}/>
                                    {footer}
                                </View>
                            )
                        }): footer)//无结果
                        :null
                    }
                </ScrollView>
                {
                    ready?null:<Loading />
                }

                {filter?<View style={good_css.wrap}>
                    <Animated.View style={ good_css.mask }>
                        <TouchableOpacity onPress={()=>this.out()} style={{width:width,height:height}}>

                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[good_css.tip , {transform: [{
                            translateY: this.state.offset.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height,100]
                            }),
                        }]
                    }]}>
                        <Filter
                            submitFun={this.submitFun.bind(this)}
                            ref="filter11"
                            defaultVal={defaultVal}
                            formData={formData}
                            entranceObj={entranceObj}
                            typeObj={typeObj}
                            sortObj={sortObj}
                            cityArr={cityArr}
                        />
                    </Animated.View>
                </View>:null}

                {menuRan?<MenuRan closeMenu={this.closeMenu.bind(this)} navigate={navigate} type={1}/>:null}
            </View>
        );
    }
}