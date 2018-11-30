import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    Alert,
    Keyboard,
    ImageBackground,
    Image,
    TouchableOpacity, AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import { doLogin } from '../store/actions/login';
import Icon from "react-native-vector-icons/Ionicons";
import * as types from "../store/constants";

import Loading from './Loading';
import login_css from '../css/login_css';
import Ajax from "../common/Ajax";

const { width } = Dimensions.get('window');

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFocus: 0,
            refreshing:true,
            formData:{
                mphone:'',
                password:'',
                validate_code:'',
            },
            pass:true,
            countdown:60
        };
        this.goLogin = this.goLogin.bind(this);
    }
    //判断手机号
    isPhone (val) {
        let myreg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(val)) {
            return false;
        } else {
            return true;
        }
    }
    goLogin(data){
        this.props.navigation.state.params.setVal(data);
        this.props.navigation.navigate('Login')
    }
    //注册
    SignupFun(){
        let mphone = this.state.formData.mphone;
        let validate_code = this.state.formData.validate_code;
        let password = this.state.formData.password;
        if(!mphone){
            Alert.alert('请输入手机号');
            return false;
        }
        if(!this.isPhone(mphone)){
            Alert.alert('请输入正确的手机号');
            return false;
        }
        if(!validate_code){
            Alert.alert('请输入短信验证码');
            return false;
        }
        if(!password){
            Alert.alert('请输入密码');
            return false;
        }
        if(password.length<6){
            Alert.alert('密码至少为6位');
            return false;
        }
        this.setState({
            refreshing:false,
        });
        Ajax.post('http://jdchamgapi.chaojids.com/site/signup',this.state.formData)
            .then((response)=>{
                console.log(response);
                this.setState({ refreshing: true });
                if(response.result*1===1){
                    this.goLogin(this.state.formData)
                }else{
                    Alert.alert(response.msg)
                }
        }).catch((error) => {
            this.setState({ refreshing: true });
            // Alert.alert('系统错误');
            // console.warn(error);
        });
    }
    //时间倒数
    settime(){
        let t = setInterval(()=>{
            if(this.state.countdown>0){
                this.setState({
                    countdown:this.state.countdown-1
                });
            }else{
                this.setState({
                    countdown:60
                });
                clearInterval(t)
            }
        },1000)
    }
    //发送验证码
    sendFun(){
        let mphone = this.state.formData.mphone;
        if(!mphone){
            Alert.alert('请输入手机号');
            return false;
        }
        if(!this.isPhone(mphone)){
            Alert.alert('请输入正确的手机号');
            return false;
        }
        Ajax.post('http://jdchamgapi.chaojids.com/site/send-mphone-code',{"mphone":mphone,type:1})
            .then((response) => {
                console.log(response);
                if(response.result*1===1){
                Alert.alert(response.msg)
                this.settime();
            }else{
                this.setState({
                    currentDown:60
                });
                Alert.alert(response.msg)
            }
        }).catch((error) => {
            this.setState({
                currentDown:60
            });
            console.warn(error);
            // Alert.alert('系统错误');
            // console.error(error);
        });
    }
    static navigationOptions = ({ navigation }) => ({
        header: null
    });
    render(){
        const { isFocus,refreshing,countdown,pass } = this.state;
        const { goBack,navigate } = this.props.navigation;
        return (
            <View style={login_css.container}>
                {!refreshing&&<Loading />}
                <View style={login_css.hea}>
                    <Icon name="ios-arrow-back" size={40} color={'#fff'} onPress={() => goBack()} />
                    <Text style={{color:'#fff',fontSize:20,textAlign:'center',flex:1,paddingRight:30}}>注册</Text>
                </View>
                <View style={login_css.inputWrap}>
                    <TextInput
                        style={[login_css.loginInput,{borderColor: isFocus===1?'#1e88f5':'#DBDBDB'}]}
                        underlineColorAndroid='transparent'
                        onFocus={()=>this.setState({isFocus: 1})}
                        onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,mphone:text} })}
                        placeholder='手机号'
                        placeholderTextColor='#ccc'
                        keyboardType="numeric"
                    />

                    <View style={{flexDirection:'row',width: width*0.9,justifyContent:'space-between',flexWrap:'nowrap'}}>
                        <TextInput
                            style={[login_css.loginInput,{borderColor: isFocus===3?'#1e88f5':'#DBDBDB',width:width*0.9-150}]}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 3})}
                            onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,validate_code:text} })}
                            placeholder='输入验证码'
                            placeholderTextColor='#ccc'
                        />
                        <TouchableOpacity>
                            {countdown<60?<Text
                                style={login_css.timeBtn1}
                            >重新发送({countdown})</Text>:<Text
                                onPress={()=>{this.sendFun()}}
                                style={login_css.timeBtn}
                            >发送验证码</Text>}
                        </TouchableOpacity>
                    </View>

                    <View style={{position:'relative'}}>
                        <TextInput
                            style={[login_css.loginInput,{borderColor: isFocus===2?'#1e88f5':'#DBDBDB'}]}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 2})}
                            onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,password:text} })}
                            placeholder='请输入密码'
                            maxLength={16}
                            placeholderTextColor='#ccc'
                            keyboardType="default"
                            secureTextEntry={pass}
                        />
                        <TouchableOpacity style={{position:'absolute',right:10,top:15}} onPress={()=>{this.setState({pass:!pass})}}>
                            <Image source={pass?require('../img/mimaxianshi1.png'):require('../img/mimaxianshi2.png')} style={{width:20,height:20}}/>
                        </TouchableOpacity>
                    </View>

                    <View>

                        <TouchableOpacity
                            onPress={()=>{
                                this.SignupFun();
                            }}
                            style={login_css.btnWrap}
                        >
                            <Text style={login_css.btn}>注册</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View>
                </View>
            </View>
        )
    }
}



const mapStateToProps = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    login: (payload) => dispatch(doLogin(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)