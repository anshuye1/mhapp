import React, { Component } from 'react';
import {Text, View, Button, Image, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';

import Ajax from '../common/Ajax';
import Loading from '../common/Loading';
const UrlStart = 'http://jdchamgapi.chaojids.com';

const {width,height} = Dimensions.get('window');

export default class Vip extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(){
        super();
        this.state = {
            data:[],
            ready:false,
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
        Ajax.post(UrlStart+'/jd/user/my-message',{token:this.state.token})
            .then((response)=>{
                console.log(response);
                if(response.result==1){
                    this.setState({
                        data:response.data,
                        ready:true
                    });
                }else{
                    if(response.msg){
                        alert(response.msg)
                    }else{
                        alert('系统错误')
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
                alert('系统错误')
            })
    }

    componentDidMount(){
        this.getToken()
    }

    render() {
        const {goBack,navigate} = this.props.navigation;
        const {ready,data} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:0}}>
                        <Image source={require('../img/logo11.png')} style={{width:30,height:30,marginLeft:8}}/>
                    </TouchableOpacity>
                    <View style={styles.header_wrap}>
                        <Text style={styles.header_text}>消息</Text>
                    </View>
                </View>


                {ready?
                    <View style={styles.bottom}>
                        {data.map((item,index)=>{
                            return (
                                <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Content',{
                                    id:item.id
                                })}} key={index.toString()}>
                                    <View><Image source={require('../img/xxi12.png')} style={styles.iconImg}/></View>
                                    <Text style={styles.item}>{item.title}</Text>
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
        flex:1,paddingRight:38
    },
    header_text:{
        color:'#fff',fontSize:18,fontWeight:'600',textAlign:'center'
    },
    bottom: {
        flex: 1
    },
    bottomItem:{
        height:62,
        width:width,
        borderBottomColor:'#F0F3F5',
        borderBottomWidth:1,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingLeft:15,
    },
    iconImg:{
        width:20,
        height:18,
        marginRight:16
    },
    item:{
        fontSize:14,
        color:'#4A4A4A',
    },
    bottomLast:{
        borderBottomWidth:0,
    },
    scrollView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    headImg: {
        width: 150,
        height: 150
    }
});