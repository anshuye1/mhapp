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
  TouchableOpacity,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import { doLogin } from '../store/actions/login';
import Icon from "react-native-vector-icons/Ionicons";
import * as types from "../store/constants";

import Loading from './Loading';
import login_css from '../css/login_css';

const { width } = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: 0,
      refreshing:true,
      pass:true,
      formData:{
        mphone:'',
        password:''
      }
    }
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow () {
    // alert('Keyboard Shown');
  }
  _keyboardDidHide () {
    // alert('Keyboard Hidden');
  }
  isPhone (val) {
      let myreg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(val)) {
          return false;
      } else {
          return true;
      }
  }
  loginFun () {
      let mphone = this.state.formData.mphone;
      let password = this.state.formData.password;
      if(!mphone){
          Alert.alert('请输入手机号');
          return false;
      }
      if(!this.isPhone(mphone)){
          Alert.alert('请输入正确的手机号');
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
      fetch('http://jdchamgapi.chaojids.com/site/login',opts)
          .then((response) => {
              this.setState({ refreshing: true });
              return response.json();
          }).then((responseText) => {
              if(responseText.result*1===1){
                  console.warn(responseText.data.token);
                  this.props.login(responseText.data.token);
                  AsyncStorage.setItem('token',responseText.data.token);
                  this.props.navigation.navigate('SkuList');
              }else{
                Alert.alert(responseText.msg)
              }
          }).catch((error) => {
          this.setState({ refreshing: true });
              Alert.alert('系统错误');
              // console.error(error);
          });
  }


  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  render() {
    const { isFocus,refreshing,pass } = this.state;
    const { goBack,navigate } = this.props.navigation;
    return (
      <View style={login_css.container}>
        {!refreshing&&<Loading />}
        <ImageBackground style={login_css.top} source={require('../img/dlbg.png')} resizeMode='stretch'>
          <View style={login_css.iconWrap}>
              <Icon name="ios-arrow-back" size={50} color={'#fff'} onPress={() => goBack()} />
          </View>
          <View style={{marginTop:130}}>
              <Image
                  style={{width:100,height:67}}
                  source={require('../img/Group23.png')}
              />
          </View>

        </ImageBackground>
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
                      this.loginFun();
                  }}
                  style={login_css.btnWrap}
              >
                <Text style={login_css.btn}>登录</Text>
              </TouchableOpacity>

            <View style={login_css.middleBottom}>
              <TouchableOpacity login={this.props.login} onPress={()=>navigate('Signup')}>
                  <Text style={login_css.textColor} >注册京东魔盒</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                  <Text style={login_css.textColor}>忘记密码</Text>
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

const mapStateToProps = state => ({
  state
})

const mapDispatchToProps = dispatch => ({
  login: (payload) => dispatch(doLogin(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
