import React, { Component } from 'react';
import { Text, Button, View,TextInput,Image,Dimensions,TouchableOpacity,StyleSheet,Alert,ScrollView } from 'react-native';

import ToastShow from "../common/Toast"; // 导入
import Ajax from '../common/Ajax';
import MineHea from "./MineHea";
import mine_css from "../css/mine_css";
import common_css from "../css/common_css";



export default class Vip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            avatarSource: null,
            formData:{
                content:'',
                contact:'',
                token:props.navigation.state.params.token
            }
        };
    }

    static navigationOptions = ({ navigation }) => ({
        header:null
    });

    suggest(){
        Ajax.post('/user/feedback',this.state.formData)
            .then((response)=>{
                if(response.result*1===1){
                    this.setState({
                        formData:{
                            ...this.state.formData,
                            content:'',
                            contact:''
                        }
                    });
                    ToastShow.toastShort(response.msg)
                }else{
                    ToastShow.toastShort(response.msg)
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    render() {
        const {goBack} = this.props.navigation;
        const {formData} = this.state;
        return (
            <View style={common_css.container1}>
                <MineHea goBack={goBack} title={'意见反馈'}/>
                <ScrollView style={{padding:20}} keyboardShouldPersistTaps={'never'}>
                    <Text style={mine_css.suFontHea}>
                        问题和意见（必填）
                    </Text>
                    <TextInput
                        style={mine_css.suInput}
                        multiline = {true}
                        numberOfLines = {8}
                        defaultValue={formData.content}
                        placeholder="请填写10个字以上的问题描述以便我们提供更好的帮 助和改进"
                        onChangeText={(text) => this.setState({
                            formData:{
                                ...this.state.formData,
                                content:text
                            }
                        })}
                    />
                    <Text style={mine_css.suFontHea}>
                        联系方式（选填，便于我们与你联系）
                    </Text>
                    <TextInput
                        style={mine_css.suInput1}
                        multiline = {true}
                        defaultValue={formData.contact}
                        placeholder="留下QQ号或微信号或邮箱或手机号，方便我们联系您哦"
                        onChangeText={(text) => this.setState({
                            formData:{
                                ...this.state.formData,
                                contact:text
                            }
                        })}
                    />

                    <TouchableOpacity
                        onPress={this.suggest.bind(this)}
                    >
                        <Text style={mine_css.suBtn}>确定</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}