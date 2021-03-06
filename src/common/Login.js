import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard,
    ImageBackground,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ScrollView
} from 'react-native';

import {connect} from 'react-redux';
import {doLogin} from '../store/actions/login';

import Loading from './Loading';
import MineHea from '../mine/MineHea';
import Ajax from "../common/Ajax";
import login_css from '../css/login_css';
import ToastShow from "./Toast";
import common_css from "../css/common_css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: 0,
            refreshing: true,
            pass: true,
            formData: {
                mphone: '',
                password: ''
            }
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        // alert('Keyboard Shown');
    }

    _keyboardDidHide() {
    }

    isPhone(val) {
        let myreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(val)) {
            return false;
        } else {
            return true;
        }
    }

    loginFun() {
        let mphone = this.state.formData.mphone;
        let password = this.state.formData.password;
        if (!mphone) {
            ToastShow.toastShort('请输入手机号');
            return false;
        }
        if (!this.isPhone(mphone)) {
            ToastShow.toastShort('请输入正确的手机号');
            return false;
        }
        if (!password) {
            ToastShow.toastShort('请输入密码');
            return false;
        }
        if (password.length < 6) {
            ToastShow.toastShort('密码至少为6位');
            return false;
        }
        this.setState({
            refreshing: false,
        });
        Ajax.post('/site/login', this.state.formData)
            .then((response) => {
                if (response.result * 1 === 1) {
                    console.log(response.data.token);
                    this.props.login(response.data.token);
                    AsyncStorage.setItem('token', response.data.token);
                    this.props.navigation.navigate('SkuList');
                } else {
                    ToastShow.toastShort(response.msg)
                }
                this.setState({refreshing: true});
            }).catch((error) => {
            this.setState({refreshing: true});
            ToastShow.toastShort('系统错误');
            // console.error(error);
        });
    }

    setVal(data) {
        this.setState({
            formData: {
                mphone: data.mphone,
                password: data.password
            }
        });
        if (data.password) {
            if (data.password_confirm) {
                ToastShow.toastShort('修改密码成功')
            } else {
                ToastShow.toastShort('注册成功')
            }
        }
    }


    static navigationOptions = ({navigation}) => ({
        header: null
    });

    render() {
        const {isFocus, refreshing, pass, formData} = this.state;
        const {goBack, navigate} = this.props.navigation;
        console.log(this.state.formData);
        return (
            <ScrollView style={common_css.container1} keyboardShouldPersistTaps={'never'}>
                {!refreshing && <Loading/>}
                <ImageBackground style={login_css.top} source={require('../img/dlbg.png')} resizeMode='stretch'>
                    <View style={login_css.iconWrap}>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Image source={require('../img/fhui1.png')} style={login_css.backImg}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image
                            style={login_css.loginLogo}
                            source={require('../img/Group23.png')}
                        />
                    </View>

                </ImageBackground>
                <View style={login_css.inputWrap}>
                    <TextInput
                        // style={[login_css.loginInput, {borderColor: isFocus === 1 ? '#40a9ff' : '#DBDBDB'}]}
                        style={login_css.loginInput}
                        underlineColorAndroid='transparent'
                        onFocus={() => this.setState({isFocus: 1})}
                        onChangeText={(text) => this.setState({formData: {...formData, mphone: text}})}
                        placeholder='手机号'
                        value={formData.mphone}
                        placeholderTextColor='#ccc'
                        keyboardType="numeric"
                    />
                    <View style={{position: 'relative'}}>
                        <TextInput
                            style={login_css.loginInput}
                            underlineColorAndroid='transparent'
                            onFocus={() => this.setState({isFocus: 2})}
                            onChangeText={(text) => this.setState({formData: {...formData, password: text}})}
                            placeholder='请输入密码'
                            value={formData.password}
                            maxLength={16}
                            placeholderTextColor='#ccc'
                            keyboardType="default"
                            secureTextEntry={pass}
                        />
                        <TouchableOpacity style={login_css.eyeImgWrap} onPress={() => {
                            this.setState({pass: !pass})
                        }}>
                            <Image
                                source={pass ? require('../img/mimaxianshi1.png') : require('../img/mimaxianshi2.png')}
                                style={login_css.eyeImg}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                this.loginFun();
                            }}
                            style={login_css.btnWrap}
                        >
                            <Text style={login_css.btn}>登录</Text>
                        </TouchableOpacity>
                        <View style={login_css.middleBottom}>
                            <TouchableOpacity login={this.props.login} onPress={() => navigate('Signup', {
                                setVal: this.setVal.bind(this)
                            })}>
                                <Text style={login_css.textColor}>注册京东魔盒</Text>
                            </TouchableOpacity>

                            <TouchableOpacity login={this.props.login} onPress={() => navigate('Forget', {
                                setVal: this.setVal.bind(this)
                            })}>
                                <Text style={login_css.textColor}>忘记密码</Text>
                            </TouchableOpacity>
                        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
