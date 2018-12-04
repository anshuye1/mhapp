import React, { Component } from 'react';
import {Text, View, Button, Image, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import Ajax from "../common/Ajax";
import {doLogin} from "../store/actions/login";
import {connect} from "react-redux";

import MineHea from './MineHea';
import mine_css from '../css/mine_css';
import ToastShow from "../common/Toast";


class outLogin extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props){
        super(props);
        this.state={
            token:''
        }
    }
    outLoading(){
        Ajax.post('http://jdchamgapi.chaojids.com/jd/user/logaut',{token:this.props.state.login.token})
            .then((response) => {
                console.log(response);
                if(response.result==1){
                    alert(response.msg);
                    AsyncStorage.setItem('token','');
                    this.props.login('');
                    this.props.navigation.navigate('Login');
                }else{
                    alert(response.msg)
                }
            }).catch((error) => {
            alert(error)
        });
    }
    componentDidMount(){

    }

    render() {
        const {goBack,navigate} = this.props.navigation;
        const {token} = this.props.state.login;
        return (
            <View style={mine_css.modifyWrap}>
                <MineHea goBack={goBack} title={'设置'}/>

                <View style={mine_css.modifyInner}>
                    <TouchableOpacity style={mine_css.modifyBtn} onPress={()=>{
                        if(token){
                            navigate('Modify',{
                                token:token
                            })
                        }else{
                            ToastShow.toastShort('请先登陆')
                        }
                    }}>
                        <Text style={mine_css.modifyText}>修改密码</Text>
                        <Image source={require('../img/gd11.png')} style={mine_css.modifyImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.outLoading.bind(this)} style={mine_css.outWrap}>
                        <Text style={mine_css.outBtn}>退出登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const mapState = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    login: (payload) => dispatch(doLogin(payload))
})


export default connect(mapState,mapDispatchToProps)(outLogin)