import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Share,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import MineHea from "./MineHea";
import mine_css from "../css/mine_css";
import Ajax from "../common/Ajax";
import ToastShow from "../common/Toast";
import Loading from "../common/Loading";
import Alipay from 'react-native-yunpeng-alipay'
import common_css from "../css/common_css";
const levelObj = {
    1:'2',
    2:'3',
    3:'4',
};//levelId 转换
export default class Vip extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props){
        super(props);
        this.state = {
            name:props.navigation.state.params.name,
            token:props.navigation.state.params.token,
            amount:'-',
            vipArr:[],
            month:1,
            vipActive:1,
            monthActive:1,
            ready:true,
            focus:'2',
            total_count:'0',
            share_code:''
        };
        this.allowPayFun = this.allowPayFun.bind(this);
        this.vipCount = this.vipCount.bind(this);
    }
    //请求可以购买的vip
    allowPayFun () {
        this.setState({ready:false});//loading
        Ajax.post('/jd/personal/user-info',{token:this.state.token})
            .then((response)=>{
                console.log(response);
                if(response.result*1==1){
                    let data = response.level_upgrade;
                    let arr = [];
                    data.map((item)=>{arr.push(item)});
                    let vipActive = 1;
                    if(arr.length==1){vipActive=3}
                    if(arr.length==2){vipActive=2}
                    this.setState({
                        vipArr:arr,
                        month:response.mem_month,
                        vipActive:vipActive,
                        monthActive:response.mem_month
                    },()=>{
                        this.vipCount();
                    })
                }else{
                    ToastShow.toastShort(response.msg);
                    this.setState({ready:true});//关闭loading
                }
            })
            .catch((error)=>{
                console.log(error);
                this.setState({ready:true});//关闭loading
            })
    }
    //钱计算
    vipCount(){
        const {token,monthActive,vipActive} = this.state;
        this.setState({ready:false});//打开loading
        Ajax.post('/jd/personal/mem-fund',{token:token,month:monthActive,level_id:levelObj[vipActive]})
            .then((respones)=>{
                console.log(respones);
                if(respones.result*1===1){
                    this.setState({
                        amount:respones.price
                    })
                }else{
                    ToastShow.toastShort(respones.msg)
                }
                this.setState({ready:true});//关闭loading
            })
            .catch((error)=>{
                console.log(error);
                this.setState({ready:true});//关闭loading
            })
    }
    //分享Ajax
    shareAjax(){
        Ajax.post('/jd/ranking/cps-detail',{token:this.state.token})
            .then((respones)=>{
                console.log(respones);
                if(respones.result*1===1){
                    this.setState({
                        total_count:respones.total_count.toString(),
                        share_code:respones.share_code
                    })
                }else{
                    ToastShow.toastShort(respones.msg)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    //分享方法
    async onShare(){
        try {
            const result = await Share.share({
                 message: 'http://jdmohe.com/home/share?share_code='+this.state.share_code,
                title:'排名莫名其妙下降？如何查询对手的销量？如何查询宝贝权重趋势变化？竞品监控？推荐使用“京东魔盒”，快人一步洞悉市场行情！',
                url:'http://jdmohe.com/home/share?share_code='+this.state.share_code
             });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    ToastShow.toastShort('分享成功')
                    // shared with activity type of result.activityType
                } else {
                    // shared
                    console.log(result,3424);
                }
            } else if (result.action === Share.dismissedAction) {
                console.log(result,1111);
                // dismissed
            }
        }
        catch (error) {
            ToastShow.toastShort(error.message);
        }
    }
    //支付
    payAjax(){
        const {amount,token,monthActive,vipActive} = this.state;
        this.setState({
            ready:false
        });
        Ajax.post('/jd/pay/get-pay-info',{token:token,amount:amount,month:monthActive,level_id:levelObj[vipActive]})
            .then((respones)=>{
                console.log(respones);
                if(respones.result*1===1){
                    /*打开支付宝进行支付*/
                    Alipay.pay(respones.data).then((data) => {
                            if (data.indexOf('resultStatus')!==-1) {
                                let resultStatus = data.match(/resultStatus={[0-9]+}/g)[0].match(/\d+/g)[0];
                                console.log(resultStatus);
                                /*处理支付结果*/
                                switch (resultStatus) {
                                    case "9000":
                                        ToastShow.toastShort('支付成功');
                                        DeviceEventEmitter.emit('vip');
                                        break;
                                    case "8000":
                                        ToastShow.toastShort('支付结果未知,请查询订单状态');
                                        break;
                                    case "4000":
                                        ToastShow.toastShort('订单支付失败');
                                        break;
                                    case "5000":
                                        ToastShow.toastShort('重复请求');
                                        break;
                                    case "6001":
                                        ToastShow.toastShort('用户中途取消');
                                        break;
                                    case "6002":
                                        ToastShow.toastShort('网络连接出错');
                                        break;
                                    case "6004":
                                        ToastShow.toastShort('支付结果未知,请查询订单状态');
                                        break;
                                    default:
                                        ToastShow.toastShort('其他失败原因');
                                        break;
                                }
                            } else {
                                ToastShow.toastShort('其他失败原因')
                            }
                        }, (err) => {
                            console.log(err);
                            ToastShow.toastShort('支付失败，请重新支付')
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                }else{
                    ToastShow.toastShort(respones.msg)
                }
                this.setState({
                    ready:true
                });
            })
            .catch((error)=>{
                this.setState({
                    ready:true
                });
                console.log(error)
            })
    }

    componentDidMount(){
        this.allowPayFun();
        this.shareAjax();
    }

    render() {
        const {goBack} = this.props.navigation;
        const {name,total_count,amount,month,vipArr,vipActive,monthActive,ready,focus} = this.state;
        let vip_arr = ['VIP1','VIP2','VIP3'];
        let monthArr = ['1','3','6','12'];
        return (
            <View style={common_css.container1}>
                <MineHea goBack={goBack} title={'VIP购买'}/>
                <ScrollView style={mine_css.vipBox}>
                    <View style={mine_css.vipWrap}>
                        <View style={mine_css.vipGroup}>
                            <TouchableOpacity style={mine_css.vipBtn} onPress={()=>this.setState({focus:'1'})}>
                                <Text style={[mine_css.vipBtn,focus==1?mine_css.vipBtn1:{}]}>邀请好友</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={mine_css.vipBtn} onPress={()=>this.setState({focus:'2'})}>
                                <Text style={[mine_css.vipBtn,focus==2?mine_css.vipBtn1:{}]}>购买会员</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={mine_css.heaTitle}>两种方式 获得所有权限</Text>
                        {focus*1===2?
                            <View style={mine_css.vipWrap}>
                                <View style={mine_css.vipItem}>
                                    <Text style={mine_css.vipName}>账号：</Text>
                                    <Text style={[mine_css.vipOption,{color:'#FF465D'}]}>{name}</Text>
                                </View>
                                <View style={mine_css.vipItem}>
                                    <Text style={mine_css.vipName}>等级：</Text>
                                    <View style={mine_css.vipOption}>
                                        {vip_arr.map((item,i)=>{
                                            let vipArrLen = vipArr.length;
                                            let allowLevel = vipArrLen;
                                            if(vipArrLen==1){allowLevel=3}
                                            if(vipArrLen==3){allowLevel=1}
                                            let flag = allowLevel*1<=i*1+1;//允许购买的等级小于等于当前等级可以购买，true,可以购买
                                            return (
                                                <TouchableOpacity
                                                    key={i.toString()}
                                                    onPress={()=>{
                                                        if(!flag){
                                                            ToastShow.toastShort('不可购买')
                                                        }else{
                                                            this.setState({
                                                                vipActive:i*1+1
                                                            },()=>{
                                                                this.vipCount()
                                                            })
                                                        }
                                                    }}
                                                >
                                                    <Text style={[mine_css.vipItemBtn,!flag?mine_css.vipDisabled:{},vipActive==(i*1+1)?mine_css.vipActive:{}]}>{item}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </View>
                                <View style={mine_css.vipItem}>
                                    <Text style={mine_css.vipName}>时间：</Text>
                                    <View style={mine_css.vipOption}>
                                        {monthArr.map((item,i)=>{
                                            let text = item==1?'单月':`${item}个月`;
                                            let flag = month*1<=item*1;//允许购买的月份小于等于当前选项flag = true,可以购买
                                            return (
                                                <TouchableOpacity
                                                    key={i.toString()}
                                                    onPress={()=>{
                                                        if(!flag){
                                                            ToastShow.toastShort('不可购买')
                                                        }else{
                                                            this.setState({
                                                                monthActive:item
                                                            },()=>{
                                                                this.vipCount()
                                                            })
                                                        }
                                                    }}
                                                >
                                                    <Text style={[mine_css.vipItemBtn1,!flag?mine_css.vipDisabled:{},monthActive==item?mine_css.vipActive:{}]}>{text}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </View>
                                <View style={mine_css.vipItem}>
                                    <Text style={mine_css.vipName}>金额：</Text>
                                    <Text style={[mine_css.vipOption,{color:'#FF465D'}]}>{amount}</Text>
                                </View>
                                <View style={mine_css.vipItem}>
                                    <Text style={mine_css.vipName}>支付方式：</Text>
                                    <Text style={mine_css.vipOption}>
                                        <Image source={require('../img/xze2.png')} style={mine_css.vipSmallImg}/>
                                        &nbsp;&nbsp;支付宝</Text>
                                </View>
                                <View style={[mine_css.vipItem,{justifyContent:'center'}]}>
                                    <TouchableOpacity onPress={this.payAjax.bind(this)}>
                                        <Text style={mine_css.vipSubmit}>确认付款</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={mine_css.vipWrap}>
                                <Image source={require('../img/VIPbg.png')} style={mine_css.shareBg}/>
                                <Text>邀请好友拿奖励 邀请无上限，多邀多得</Text>
                                <Text style={mine_css.shareNum}>已累计邀请<Text style={{color:'red'}}>{total_count}</Text>人</Text>
                                <TouchableOpacity onPress={this.onShare.bind(this)}>
                                    <Text style={mine_css.shareBtn}>去邀请</Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                </ScrollView>
                {ready?null:<Loading />}
            </View>
        );
    }
}
