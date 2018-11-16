import React, { Component } from 'react';
import { Text, Button, View,TextInput,Image,Dimensions,TouchableOpacity,StyleSheet,Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker'; // 导入

const {width,height} = Dimensions.get('window');
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
        this.state = {text: '',avatarSource: null,};
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
    render() {
        const {goBack} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:0}} onPress={()=>goBack()}>
                        <Image source={require('../img/fhui1.png')} style={{width:20,height:20,marginLeft:5}}/>
                    </TouchableOpacity>
                    <View style={styles.header_wrap}>
                        <Text style={styles.header_text}>意见反馈</Text>
                    </View>
                </View>
                <View style={{padding:20}}>
                    <Text style={styles.fontHea}>
                        问题和意见（必填）
                    </Text>
                    <TextInput
                        style={{height:220,backgroundColor:'#fff',borderWidth:1,borderColor:'#ddd',fontSize:16,color:'#4A4A4A',padding:10,lineHeight:25,textAlignVertical: 'top',marginBottom:15,borderRadius:8}}
                        multiline = {true}
                        numberOfLines = {8}
                        placeholder="请填写10个字以上的问题描述以便我们提供更好的帮 助和改进"
                        onChangeText={(text) => this.setState({text})}
                    />
                    {/*<Text style={styles.fontHea}>*/}
                        {/*图片（选填，提供问题截图）*/}
                    {/*</Text>*/}
                    {/*<TouchableOpacity onPress={()=>{this._imagePicker()}}>*/}
                        {/*<Text>上传图片</Text>*/}
                    {/*</TouchableOpacity>*/}
                    <Text style={styles.fontHea}>
                        联系方式（选填，便于我们与你联系）
                    </Text>
                    <TextInput
                        style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#ddd',fontSize:16,color:'#4A4A4A',padding:10,lineHeight:30,marginBottom:15,borderRadius:8}}
                        multiline = {true}
                        placeholder="留下QQ号或微信号或邮箱或手机号，方便我们联系您哦"
                        onChangeText={(text) => this.setState({text})}
                    />

                    <TouchableOpacity
                        onPress={()=>Alert.alert('提交反馈')}
                        style={{backgroundColor:'#1e88f5',borderRadius:8,marginTop:10}}
                    >
                        <Text style={{lineHeight:60,textAlign:'center',color:'#fff',fontSize:18}}>确定</Text>
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
    },
    fontHea:{
        marginBottom:10,
        fontSize:16,
        color:'#4A4A4A'
    }
});