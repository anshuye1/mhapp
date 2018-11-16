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
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { doLogin } from '../store/actions/login';
import Icon from "react-native-vector-icons/Ionicons";
import * as types from "../store/constants";

import Loading from './Loading';

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
            countdown:60
        }
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
        let formData = JSON.stringify(this.state.formData);
        let opts = {
            headers: {
                "Content-Type": "application/json"
            },
            method:"POST",   //请求方法
            body:formData,   //请求体
        };
        let _this=this;
        fetch('http://jdchamgapi.chaojids.com/site/signup',opts)
            .then((response) => {
                this.setState({ refreshing: true });
                return response.text()['_55'];
            }).then((responseText)=>{
            responseText = JSON.parse(responseText);
            if(responseText.result*1===1){
                    // console.warn(mphone);
                    // _this.props.login(mphone);
                    _this.props.navigation.navigate('Mine');
                }else{
                    Alert.alert(responseText.msg)
                }
        }).catch((error) => {
            this.setState({ refreshing: true });
            // Alert.alert('系统错误');
            console.warn(error);
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
        this.setState({
            refreshing:false,
        });
        let formData=JSON.stringify({"mphone":mphone,type:1});
        let opts = {
            headers: {
                "Content-Type": "application/json"
            },
            method:"POST",   //请求方法
            body:formData,   //请求体
        };
        fetch('http://jdchamgapi.chaojids.com/site/send-mphone-code',opts)
            .then((response) => {
                this.setState({ refreshing: true });
                return response.json();
            }).then((responseText) => {
            if(responseText.result*1===1){
                this.settime();
            }else{
                this.setState({
                    currentDown:60
                });
                Alert.alert(responseText.msg)
            }
        }).catch((error) => {
            this.setState({
                currentDown:60
            });
            console.warn(error);
            this.setState({ refreshing: true });
            // Alert.alert('系统错误');
            // console.error(error);
        });
    }
    static navigationOptions = ({ navigation }) => ({
        header: null
    });
    render(){
        const { isFocus,refreshing,countdown } = this.state;
        const { navigatenavigate, goBack,navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {!refreshing&&<Loading />}
                <View style={{ width,flexDirection: 'row', justifyContent: 'flex-start',paddingLeft: 10,backgroundColor:'#1e88f5',marginBottom:40,height:50,alignItems:'center' }}>
                    <Icon name="ios-arrow-back" size={40} color={'#fff'} onPress={() => goBack()} />
                    <Text style={{color:'#fff',fontSize:20,textAlign:'center',flex:1,paddingRight:30}}>注册</Text>
                </View>
                <View style={{ width, paddingHorizontal: 20, alignItems: 'center' }}>
                    <TextInput
                        style={[styles.loginInput,{borderColor: isFocus===1?'#1e88f5':'#DBDBDB'}]}
                        underlineColorAndroid='transparent'
                        onFocus={()=>this.setState({isFocus: 1})}
                        onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,mphone:text} })}
                        placeholder='手机号'
                        placeholderTextColor='#ccc'
                        keyboardType="numeric"
                    />

                    <View style={{flexDirection:'row',width: width*0.9,justifyContent:'space-between',flexWrap:'nowrap'}}>
                        <TextInput
                            style={[styles.loginInput,{borderColor: isFocus===3?'#1e88f5':'#DBDBDB',width:width*0.9-150}]}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 3})}
                            onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,validate_code:text} })}
                            placeholder='输入验证码'
                            placeholderTextColor='#ccc'
                        />
                        <TouchableOpacity>
                            {countdown<60?<Text
                                style={{backgroundColor:'#1e88f5',color:'#fff',lineHeight:60,height:60,width:140,textAlign:'center',borderRadius:8,fontSize:16,opacity:0.6}}
                            >重新发送({countdown})</Text>:<Text
                                onPress={()=>{this.sendFun()}}
                                style={{backgroundColor:'#1e88f5',color:'#fff',lineHeight:60,height:60,width:140,textAlign:'center',borderRadius:8,fontSize:16}}
                            >发送验证码</Text>}
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={[styles.loginInput,{borderColor: isFocus===2?'#1e88f5':'#DBDBDB'}]}
                        underlineColorAndroid='transparent'
                        onFocus={()=>this.setState({isFocus: 2})}
                        onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,password:text} })}
                        placeholder='请输入密码'
                        maxLength={16}
                        placeholderTextColor='#ccc'
                        keyboardType="number-pad"
                    />

                    <View>
                        <View style={{width: width*0.9, paddingVertical: 20}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.SignupFun();
                                    // goBack();
                                }}
                                style={{width: width*0.9,backgroundColor:'#1e88f5',borderRadius:8}}
                            >
                                <Text style={{color:'#fff',fontSize:16,lineHeight:50,textAlign:'center'}}>注册</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    loginInput: {
        width: width*0.9,
        height: 60,
        borderWidth: 1,
        marginBottom:15,
        borderRadius:8,
        fontSize:16,
        paddingLeft:10
    },
    middleBottom: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    textColor:{
        color:'#9B9B9B'
    },
    top: {
        width:width,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        height:250,
        marginBottom:60,
        justifyContent:'flex-start'
    },
});

const mapStateToProps = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    login: (payload) => dispatch(doLogin(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)