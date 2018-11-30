import React, { Component } from 'react';
import {Text, View, Button, Image, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import Ajax from "../common/Ajax";
import {doLogin} from "../store/actions/login";
import {connect} from "react-redux";
import * as types from "../store/constants";


const {width,height} = Dimensions.get('window');

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
        const {goBack} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:0}} onPress={()=>goBack()}>
                        <Image source={require('../img/fhui1.png')} style={{width:20,height:20,marginLeft:5}}/>
                    </TouchableOpacity>
                    <View style={styles.header_wrap}>
                        <Text style={styles.header_text}>设置</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={this.outLoading.bind(this)}>
                        <Text>退出登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F3F5'
    },
    header:{
        width:width,
        height:50,
        backgroundColor:'#1388f5',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    header_wrap:{
        flex:1,paddingRight:25
    },
    header_text:{
        color:'#fff',fontSize:18,fontWeight:'600',textAlign:'center'
    }
});

const mapState = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    login: (payload) => dispatch(doLogin(payload))
})


export default connect(mapState,mapDispatchToProps)(outLogin)