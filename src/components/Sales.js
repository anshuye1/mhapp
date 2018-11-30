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

import SalItem from '../page/SalItem';
import good_css from '../css/good_css';
import Ajax from "../common/Ajax";
import Loading from "../common/Loading";

const UrlStart = 'http://jdchamgapi.chaojids.com';

export default class Sales extends Component {
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
                sku:item.sku||'',
            }
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
        if(!formData.sku){
            alert('请输入sku或链接');
            return false;
        }
        this.setState({
            ready:false
        });
        Ajax.post(UrlStart+'/jd/sales/data',formData)
            .then((response)=>{
                console.log(response);
                if(response.result==1){
                    this.setState({
                        param:response,
                        error:1,
                        errorMsg:response.msg||''
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

    componentDidMount(){
        this.getToken();
    }

    render() {
        const {goBack,navigate} = this.props.navigation;
        const {formData,ready,param,error,errorMsg,token} = this.state;
        const data = param&&param.data?param.data:[];
        const thArr = ['3天','7天','15天','30天'];
        let footer =error*1?
            (<View style={good_css.footer_view}>

                <View style={[good_css.foo_top_wrap]}>
                    <Text style={good_css.msg_text}>{errorMsg}</Text>
                    {error==3?<Text style={good_css.msg_btn}>一键刷新</Text>:null}
                </View>

                <View style={good_css.foo_bom_wrap}>
                    <TouchableOpacity onPress={()=>navigate('Ranking',{
                        item:data&&data.length?data[0]:{}
                    })}>
                        <Text style={good_css.foo_bom_btn}>去查排名</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigate('Weight',{
                        item:data&&data.length?data[0]:{}
                    })}>
                        <Text style={[good_css.foo_bom_btn,good_css.foo_bom_btn1]}>去查权重</Text>
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
                        <Text style={good_css.header_text}>查销量</Text>
                    </View>
                    <View style={{justifyContent:'flex-end',flex:1,flexDirection:'row'}}>
                        <TouchableOpacity  onPress={()=>alert(2)}>
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
                            type:3
                        })}>
                            <Text style={good_css.history_btn}>历史记录</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {ready?
                    <View style={good_css.ran_hea}>
                        <Text style={good_css.ran_hea_left}>最新查询结果</Text>
                        <Text style={good_css.ran_hea_right}>{param.create_at}</Text>
                    </View>
                    :null
                }
                {/*查询结果*/}
                <ScrollView>
                    {ready?
                        <View>
                            {data.length?
                                <View style={{flexDirection:'column'}}>
                                    <View style={[good_css.SkuList,{marginBottom:1}]}>
                                        <View style={good_css.img_wrap}>
                                            <Image source={{
                                                uri: data[0].img
                                            }} style={good_css.good_img} />
                                        </View>
                                        <View style={good_css.good_detail}>
                                            <View style={good_css.good_top}>
                                                <Text style={good_css.title} numberOfLines={1}>{data[0].title}</Text>
                                                <Text numberOfLines={1} style={[good_css.smallFont,{marginTop:26}]}>{data[0].specification}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {data.map((sal,index1)=>{
                                        return (
                                            <View style={good_css.sal_table} key={index1.toString()}>
                                                <Text style={good_css.sal_title}>{index1?'spu：':'sku：'}{sal.sku}</Text>
                                                <View style={{flexDirection:'column'}}>
                                                    <View style={good_css.sal_tr}>
                                                        <Text style={good_css.sal_th}></Text>
                                                        {thArr.map((item,index)=>{
                                                            return (
                                                                <Text style={good_css.sal_th} key={index.toString()}>{item}</Text>
                                                            )
                                                        })}
                                                    </View>
                                                    <View style={good_css.sal_tr}>
                                                        <Text style={good_css.sal_td}>销量:</Text>
                                                        {thArr.map((item,index)=>{
                                                            return (
                                                                <Text style={good_css.sal_td} key={index.toString()}>{sal.data[index]&&sal.data[index].totalUV}</Text>
                                                            )
                                                        })}
                                                    </View>
                                                    <View style={good_css.sal_tr}>
                                                        <Text style={good_css.sal_td}>访客:</Text>
                                                        {thArr.map((item,index)=>{
                                                            return (
                                                                <Text style={good_css.sal_td} key={index.toString()}>{sal.data[index]&&sal.data[index].visitor}</Text>
                                                            )
                                                        })}
                                                    </View>
                                                    <View style={good_css.sal_tr}>
                                                        <Text style={good_css.sal_td}>转化率：</Text>
                                                        {thArr.map((item,index)=>{
                                                            return (
                                                                <Text style={good_css.sal_td} key={index.toString()}>{sal.data[index]&&(sal.data[index].totalUV/sal.data[index].visitor*100).toFixed(2)+'%'}</Text>
                                                            )
                                                        })}
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })}
                                    {footer}
                                </View>
                                :footer
                            }
                        </View>
                        :null
                    }
                </ScrollView>
                {
                    ready?null:<Loading />
                }
            </View>
        );
    }
}