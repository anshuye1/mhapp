import React, { Component } from 'react';
import { Text, View,Button,Image,Dimensions,TouchableOpacity,StyleSheet } from 'react-native';
import MineHea from "./MineHea";
import mine_css from "../css/mine_css";
import Ajax from "../common/Ajax";
import ToastShow from "../common/Toast";

const {width,height} = Dimensions.get('window');

export default class Vip extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props){
        super(props);
        this.state = {
            name:props.navigation.state.params.name,
            token:props.navigation.state.params.token,
            count:'',
            vipArr:[],
            month:1,
            vipActive:1,
            monthActive:1,
        }
        this.allowPayFun = this.allowPayFun.bind(this);
        this.vipCount = this.vipCount.bind(this);
    }
    //请求可以购买的vip
    allowPayFun () {
        Ajax.post('http://jdchamgapi.chaojids.com/jd/personal/user-info',{token:this.state.token})
            .then((response)=>{
                console.log(response);
                if(response.result*1==1){
                    let data = response.level_upgrade;
                    let arr = [];
                    data.map((item)=>{arr.push(item)});
                    let vipActive = 1;
                    if(arr.length==1){vipActive=3}
                    if(arr.length==2){vipActive=2}
                    console.log(vipActive);
                    this.setState({
                        vipArr:arr,
                        month:response.mem_month,
                        vipActive:vipActive,
                        monthActive:response.mem_month
                    },()=>{
                        this.vipCount();
                    })
                }else{

                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    vipCount(){
        let levelObj = {
            1:'2',
            2:'3',
            3:'4',
        };
        const {token,monthActive,vipActive} = this.state;
        Ajax.post('http://jdchamgapi.chaojids.com/jd/personal/mem-fund',{token:token,month:monthActive,level_id:levelObj[vipActive]})
            .then((respones)=>{
                console.log(respones);
                if(respones.result*1===1){
                    this.setState({
                        count:respones.price
                    })
                }else{
                    ToastShow.toastShort(respones.msg)
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    componentDidMount(){
        this.allowPayFun();
    }

    render() {
        const {goBack} = this.props.navigation;
        const {name,token,count,month,vipArr,vipActive,monthActive} = this.state;
        let vip_arr = ['VIP1','VIP2','VIP3'];
        let monthArr = ['1','3','6','12'];
        return (
            <View style={mine_css.modifyWrap}>
                <MineHea goBack={goBack} title={'VIP购买'}/>
                <View style={mine_css.vipWrap}>
                    <View style={mine_css.vipGroup}>
                        <Text style={mine_css.vipBtn}>邀请好友</Text>
                        <Text style={[mine_css.vipBtn,mine_css.vipBtn1]}>购买会员</Text>
                    </View>
                    <Text>两种方式 获得所有权限</Text>
                    <View style={mine_css.vipItem}>
                        <Text style={mine_css.vipName}>账号：</Text>
                        <Text style={[mine_css.vipOption,{color:'#FF465D'}]}>{name}</Text>
                    </View>
                    <View style={mine_css.vipItem}>
                        <Text style={mine_css.vipName}>等级：</Text>
                        <View style={mine_css.vipOption}>
                            {vip_arr.map((item,i)=>{
                                let vipArrLen = vipArr.length;
                                if(vipArrLen==1){vipArrLen=3}
                                if(vipArrLen==3){vipArrLen=1}
                                let flag = vipArrLen*1>=i*1;
                                return (
                                    <TouchableOpacity
                                        key={i.toString()}
                                        onPress={()=>{
                                            if(flag){
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
                                        <Text style={[mine_css.vipItemBtn,flag?mine_css.vipDisabled:{},vipActive==(i*1+1)?mine_css.vipActive:{}]}>{item}</Text>
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
                                let flag = month*1>item*1;
                                return (
                                    <TouchableOpacity
                                        key={i.toString()}
                                        onPress={()=>{
                                            if(flag){
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
                                        <Text style={[mine_css.vipItemBtn1,flag?mine_css.vipDisabled:{},monthActive==item?mine_css.vipActive:{}]}>{text}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={mine_css.vipItem}>
                        <Text style={mine_css.vipName}>金额：</Text>
                        <Text style={[mine_css.vipOption,{color:'#FF465D'}]}>{count}</Text>
                    </View>
                    <View style={mine_css.vipItem}>
                        <Text style={mine_css.vipName}>支付方式：</Text>
                        <Text style={mine_css.vipOption}>
                            <Image source={require('../img/xze2.png')} style={mine_css.vipSmallImg}/>
                            &nbsp;&nbsp;支付宝</Text>
                    </View>

                    <View style={[mine_css.vipItem,{justifyContent:'center'}]}>
                        <TouchableOpacity>
                            <Text style={mine_css.vipSubmit}>确认付款</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
