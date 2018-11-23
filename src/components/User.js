import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import Ajax from "../common/Ajax";

export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'用户名',
            share_time:'0',
            money_time:'0',
            level_name:'',
        };
        this.getUser = this.getUser.bind(this);
    }
    //得到用户信息
    getUser(){
        Ajax.post('http://jdchamgapi.chaojids.com/jd/personal/get-user-info',{token:this.props.token})
            .then((response) => {
                console.log(response);
                if(response.result==1){
                    this.setState({
                        phone:response.data.mphone,
                        level_name:response.data.level_name,
                        share_time:response.data.invite_fate,
                        money_time:response.data.level_fate
                    })
                }else{
                    alert(response.msg+'4323432')
                }
            }).catch((error) => {
            alert(error+'42432')
        });
    }

    componentDidMount(){
        if(this.props.token){
            this.getUser();
        }
    }

    render(){
        const {phone,share_time,money_time,level_name} = this.state;
        let obj = {
            '普通会员':{name:'普',color:'#BABFC2'},
            '试用会员':{name:'试用',color:'#F54E33'},
        };
        return (
            <View>
                <View style={{marginBottom:10,flexDirection:'row'}}>
                    <Text style={{ fontSize: 18, color: '#9B9B9B' }}>{phone}</Text>
                    {level_name?<Text style={[{ fontSize: 14, color: '#fff',backgroundColor:'#1e88f5',textAlign:'center',padding:3,marginLeft:10,borderRadius:4 },obj[level_name]?{backgroundColor:obj[level_name].color}:{}]}>{obj[level_name]?obj[level_name].name:level_name}</Text>:null}
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:14,backgroundColor:'#1e88f5',width:20,height:20,lineHeight:20,color:'#fff',borderRadius:10,textAlign:'center',marginRight:5}}>
                        邀
                    </Text>
                    <Text>剩余{share_time}天</Text>
                    <Text style={{fontSize:14,backgroundColor:'#F54E33',width:20,height:20,lineHeight:20,color:'#fff',borderRadius:10,textAlign:'center',marginLeft:25,marginRight:5}}>
                        ￥
                    </Text>
                    <Text>剩余{money_time}天</Text>
                </View>

            </View>
        )
    }
}