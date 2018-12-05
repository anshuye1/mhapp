import React, { Component } from 'react';
import {Text, View, Button, Image, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';

import Ajax from '../common/Ajax';
import Loading from '../common/Loading';
import common_css from "../css/common_css";
import ToastShow from "../common/Toast";
const UrlStart = 'http://jdchamgapi.chaojids.com';

const {width,height} = Dimensions.get('window');

class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(){
        super();
        this.state = {
            data:[],
            ready:true,
        }
    }

    //得到token
    getToken (){
        AsyncStorage.getItem('token').then((value) => {
            this.setState({
                token:value
            },()=>{
                this.mesAjax()
            })
        });
    }

    mesAjax(){
        const {token} = this.props.state.login;
        this.setState({
            ready:false
        });
        console.log(token);
        Ajax.post(UrlStart+'/jd/user/my-message',{token:token||''})
            .then((response)=>{
                console.log(response);
                if(response.result==1){
                    this.setState({
                        data:response.data,
                        ready:true
                    });
                }else{
                    if(response.msg){
                        ToastShow.toastShort(response.msg)
                    }else{
                        ToastShow.toastShort('系统错误')
                    }
                    this.setState({
                        ready:true
                    });
                }
            })
            .catch((error)=>{
                this.setState({
                    ready:true
                });
                ToastShow.toastShort('系统错误')
            })
    }

    componentDidMount(){
        this.getToken()
    }

    render() {
        const {goBack,navigate} = this.props.navigation;
        const {ready,data} = this.state;
        return (
            <View style={common_css.container}>
                <View style={common_css.header}>
                    <TouchableOpacity
                        style={{alignItems:'flex-start',flex:1}}
                        onPress={this.mesAjax.bind(this)}
                    >
                        <Image source={require('../img/logo11.png')} style={common_css.msgHeaImg}/>
                    </TouchableOpacity>
                    <View style={common_css.heaContent}>
                        <Text style={common_css.headerText}>消息</Text>
                    </View>
                    <Text style={common_css.heaRight}></Text>
                </View>


                {ready?
                    <View style={common_css.msgBottom}>
                        {data.map((item,index)=>{
                            return (
                                <TouchableOpacity style={common_css.msgBottomItem} onPress={()=>{navigate('Content',{
                                    id:item.id
                                })}} key={index.toString()}>
                                    <View><Image source={require('../img/xxi12.png')} style={common_css.msgIconImg}/></View>
                                    <Text style={common_css.msgItem}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    :
                    <Loading />
                }

            </View>
        );
    }
}

const mapState = state => ({
    state
})


export default connect(mapState)(Chat)