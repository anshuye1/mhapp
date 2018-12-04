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


import Icon from "react-native-vector-icons/Ionicons";


import Loading from './Loading';
import MineHea from '../mine/MineHea';
import login_css from '../css/login_css';
import Ajax from "../common/Ajax";
import common_css from "../css/common_css";
import ToastShow from "./Toast";

const { width } = Dimensions.get('window');

export default class Modify extends Component{
    constructor(props){
        super(props);
        console.log(props.navigation);
        this.state = {
            isFocus: 0,
            refreshing:true,
            formData:{
                password:'',
                new_password:'',
                token:props.navigation.state.params.token
            },
            pass:true,
            pass1:true,
            countdown:60
        };
    }
    //修改
    ModifyFun(){
        let password = this.state.formData.password;
        let new_password = this.state.formData.new_password;

        if(!password){
            Alert.alert('请输入密码');
            return false;
        }
        if(password.length<6){
            Alert.alert('密码至少为6位');
            return false;
        }
        if(!new_password){
            Alert.alert('请输入密码');
            return false;
        }
        if(new_password.length<6){
            Alert.alert('密码至少为6位');
            return false;
        }
        this.setState({
            refreshing:false,
        });
        console.log(this.state.formData);
        Ajax.post('http://jdchamgapi.chaojids.com/jd/user/alter-password',this.state.formData)
            .then((response)=>{
                console.log(response);
                this.setState({ refreshing: true });
                if(response.result*1===1){
                    ToastShow.toastShort('修改成功')
                }else{
                    ToastShow.toastShort(response.msg)
                }
            }).catch((error) => {
            console.log(error);
            this.setState({ refreshing: true });
        });
    }
    static navigationOptions = ({ navigation }) => ({
        header: null
    });
    render(){
        const { isFocus,refreshing,countdown,pass,pass1 } = this.state;
        const { goBack,navigate } = this.props.navigation;
        return (
            <View style={login_css.container}>
                {!refreshing?<Loading />:null}
                <MineHea goBack={goBack} title={'修改密码'}/>
                <View style={[login_css.inputWrap,{paddingTop:20}]}>

                    <View style={[common_css.inputBox,{borderColor: isFocus===1?'#1e88f5':'#DBDBDB'}]}>
                        <Text>原密码：</Text>
                        <TextInput
                            style={{flex:1}}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 1})}
                            onChangeText={(text) => this.setState({formData:{...this.state.formData,password:text} })}
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

                    <View style={[common_css.inputBox,{borderColor: isFocus===2?'#1e88f5':'#DBDBDB'}]}>
                        <Text>新密码：</Text>
                        <TextInput
                            style={{flex:1}}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 2})}
                            onChangeText={(text) => this.setState({formData:{...this.state.formData,new_password:text} })}
                            placeholder='请输入密码'
                            maxLength={16}
                            placeholderTextColor='#ccc'
                            keyboardType="default"
                            secureTextEntry={pass1}
                        />
                        <TouchableOpacity style={{position:'absolute',right:10,top:15}} onPress={()=>{this.setState({pass1:!pass1})}}>
                            <Image source={pass1?require('../img/mimaxianshi1.png'):require('../img/mimaxianshi2.png')} style={{width:20,height:20}}/>
                        </TouchableOpacity>
                    </View>

                    <View>

                        <TouchableOpacity
                            onPress={()=>{
                                this.ModifyFun();
                            }}
                            style={login_css.btnWrap}
                        >
                            <Text style={login_css.btn}>确定</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View>
                </View>
            </View>
        )
    }
}