import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { doLogin } from '../store/actions/login';

import Loading from './Loading';
import login_css from '../css/login_css';
import Ajax from "../common/Ajax";
import MineHea from "../mine/MineHea";
import common_css from "../css/common_css";
import ToastShow from '../common/Toast'

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFocus: 0,
            ready:true,
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
            ToastShow.toastShort('请输入手机号');
            return false;
        }
        if(!this.isPhone(mphone)){
            ToastShow.toastShort('请输入正确的手机号');
            return false;
        }
        if(!validate_code){
            ToastShow.toastShort('请输入短信验证码');
            return false;
        }
        if(!password){
            ToastShow.toastShort('请输入密码');
            return false;
        }
        if(password.length<6){
            ToastShow.toastShort('密码至少为6位');
            return false;
        }
        this.setState({
            ready:false,
        });
        Ajax.post('/site/signup',this.state.formData)
            .then((response)=>{
                console.log(response);
                this.setState({ ready: true });
                if(response.result*1===1){
                    this.goLogin(this.state.formData)
                }else{
                    ToastShow.toastShort(response.msg)
                }
        }).catch((error) => {
            this.setState({ ready: true });
            // ToastShow.toastShort('系统错误');
            // console.warn(error);
        });
    }
    //时间倒数
    settime(){
        this.t = setInterval(()=>{
            if(this.state.countdown>0){
                this.setState({
                    countdown:this.state.countdown-1
                });
            }else{
                this.setState({
                    countdown:60
                });
                clearInterval(this.t)
            }
        },1000)
    }
    //发送验证码
    sendFun(){
        let mphone = this.state.formData.mphone;
        if(!mphone){
            ToastShow.toastShort('请输入手机号');
            return false;
        }
        if(!this.isPhone(mphone)){
            ToastShow.toastShort('请输入正确的手机号');
            return false;
        }
        this.setState({
            ready:false,
        });
        Ajax.post('/site/send-mphone-code',{"mphone":mphone,type:1})
        .then((response) => {
            console.log(response);
            if(response.result*1===1){
                ToastShow.toastShort(response.msg)
                this.settime();
            }else{
                this.setState({
                    currentDown:60
                });
                ToastShow.toastShort(response.msg)
            }
            this.setState({
                ready:true,
            });
        }).catch((error) => {
            this.setState({
                currentDown:60,
                ready:true,
            });
            console.warn(error);
            // ToastShow.toastShort('系统错误');
            // console.error(error);
        });
    }
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    componentWillUnmount(){
        clearInterval(this.t)
    }

    render(){
        const { isFocus,ready,countdown,pass } = this.state;
        const { goBack,navigate } = this.props.navigation;
        return (
            <ScrollView style={common_css.container1} keyboardShouldPersistTaps={'never'}>
                {ready?null:<Loading />}
                <MineHea goBack={goBack} title={'注册'}/>

                <View style={login_css.inputWrap}>
                    <TextInput
                        style={login_css.loginInput}
                        underlineColorAndroid='transparent'
                        onFocus={()=>this.setState({isFocus: 1})}
                        onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,mphone:text} })}
                        placeholder='手机号'
                        placeholderTextColor='#ccc'
                        keyboardType="numeric"
                    />

                    <View style={login_css.InputWrap}>
                        <TextInput
                            style={[login_css.loginInput,login_css.loginInputSmall]}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 3})}
                            onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,validate_code:text} })}
                            placeholder='输入验证码'
                            placeholderTextColor='#ccc'
                        />
                        <TouchableOpacity onPress={this.sendFun.bind(this)}>
                            {countdown<60?
                                <Text style={login_css.timeBtn1}>重新发送({countdown})</Text>
                                :
                                <Text style={login_css.timeBtn}>发送验证码</Text>}
                        </TouchableOpacity>
                    </View>

                    <View style={{position:'relative'}}>
                        <TextInput
                            style={login_css.loginInput}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 2})}
                            onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,password:text} })}
                            placeholder='请输入密码'
                            maxLength={16}
                            placeholderTextColor='#ccc'
                            keyboardType="default"
                            secureTextEntry={pass}
                        />
                        <TouchableOpacity style={login_css.eyeImgWrap} onPress={()=>{this.setState({pass:!pass})}}>
                            <Image source={pass?require('../img/mimaxianshi1.png'):require('../img/mimaxianshi2.png')} style={login_css.eyeImg}/>
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
            </ScrollView>
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