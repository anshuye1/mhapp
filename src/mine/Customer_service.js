import React, { Component } from 'react';
import { Text, View,Button,Image,Dimensions,TouchableOpacity,StyleSheet,Clipboard } from 'react-native';
import MineHea from "./MineHea";
import mine_css from "../css/mine_css";
import ToastShow from "../common/Toast";
import common_css from "../css/common_css";

const {width,height} = Dimensions.get('window');

export default class Vip extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(){
        super();
        this.state = {
            wx:'JDmohe',
            qq:'2633005991',
            content:'',
        }
    }

    async _setClipboardContent(i){
        if(i*1===1){//wx
            Clipboard.setString(this.state.wx);
        }else{
            Clipboard.setString(this.state.qq);
        }

        try {
            var content = await Clipboard.getString();
            ToastShow.toastShort('已复制到剪切板')
        } catch (e) {
            ToastShow.toastShort(e.msg)
        }
    }

    render() {
        const {goBack} = this.props.navigation;
        const {wx,qq} = this.state;
        console.log(wx);
        return (
            <View style={common_css.container}>
                <MineHea goBack={goBack} title={'我的客服'}/>
                <View style={mine_css.contentWrap}>
                    <View style={mine_css.contentTop}>
                        <Text style={mine_css.kf_text}>微信二维码</Text>
                        <Image source={require('../img/wx_new.jpg')} style={mine_css.kf_wx}/>
                        <Text style={mine_css.kf_bottom}>{wx}</Text>
                    </View>
                    <View style={mine_css.contentBottom}>
                        <View style={mine_css.kf_item}>
                            <Text style={mine_css.kf_font}>客服微信：{wx}</Text>
                            <TouchableOpacity onPress={this._setClipboardContent.bind(this,1)}>
                                <Text style={mine_css.kf_btn}>复制微信</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={mine_css.kf_item}>
                            <Text style={mine_css.kf_font}>客服QQ：{qq}</Text>
                            <TouchableOpacity onPress={this._setClipboardContent.bind(this,2)}>
                                <Text style={mine_css.kf_btn}>复制QQ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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