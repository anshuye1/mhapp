import React, { Component } from 'react';
import { Text, Button, View,TextInput,Image,Dimensions,TouchableOpacity,StyleSheet,Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ToastShow from "../common/Toast"; // 导入
import Ajax from '../common/Ajax';
import MineHea from "./MineHea";
import mine_css from "../css/mine_css";

const options = { // 弹出框配置
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
};

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
        this._imagePicker = this._imagePicker.bind(this); // bind
    }

    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    _imagePicker() {
        ImagePicker.showImagePicker(options,(res) => {
            if (res.didCancel) {  // 返回
                return
            } else {
                let source;  // 保存选中的图片
                source = {uri: 'data:image/jpeg;base64,' + res.data};

                if (Platform.OS === 'android') {
                    source = { uri: res.uri };
                } else {
                    source = { uri: res.uri.replace('file://','') };
                }

                this.setState({
                    avatarSource: source
                });
            }
        })
    }

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
            <View style={mine_css.modifyWrap}>
                <MineHea goBack={goBack} title={'意见反馈'}/>
                <View style={{padding:20}}>
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
                    {/*<Text style={styles.fontHea}>*/}
                        {/*图片（选填，提供问题截图）*/}
                    {/*</Text>*/}
                    {/*<TouchableOpacity onPress={()=>{this._imagePicker()}}>*/}
                        {/*<Text>上传图片</Text>*/}
                    {/*</TouchableOpacity>*/}
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
                </View>
            </View>
        );
    }
}