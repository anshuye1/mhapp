import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    Platform,
    NativeModules,
    DeviceEventEmitter,
    ToastAndroid,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import codePush from "react-native-code-push";
const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };


import User from "./User";
import Ajax from "../common/Ajax";
import mine_css from "../css/mine_css";
import ToastShow from "../common/Toast";
import Loading from "../common/Loading";
import common_css from "../css/common_css";


const {width,height} = Dimensions.get('window');
const key = Platform.select({
    ios: 'OFtMbneLRlcg-JDXuXvdJKFp9_3wf4eb6812-f373-4d7d-920c-619db1092814',
    android: 'yCSjKKpJxOEFqFWXzJipAKMloAW3f4eb6812-f373-4d7d-920c-619db1092814',
});

class Mine extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
        ready:true,
        version:'',
        AsyncStorage:'',
        apkUrl:''
    }
  }

  getVersion () {
    return AsyncStorage.getItem('version').then((value) => {
        this.setState({
            version:value
        },()=>{
            if(!value){//如果没有存版本号
                this.version()
            }
        });
    });
  }

  //保存版本号
  saveVersion (key, value) {
      this.setState({
          version:value
      });
      return AsyncStorage.setItem(key,value);
  }

  //比较版本号
  versionUpdate(new_version){
      const {version} = this.state;
      if(!version){
          this.version();//重新获取版本号
          return;
      }
      console.log(321321);
      //TODO 这里还不能下载
      codePush.sync({
          installMode: codePush.InstallMode.IMMEDIATE,
          mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
          //deploymentKey为刚才生成的,打包哪个平台的App就使用哪个Key,这里用IOS的打包测试
          deploymentKey: key,
          // deploymentKey: 'OFtMbneLRlcg-JDXuXvdJKFp9_3wf4eb6812-f373-4d7d-920c-619db1092814',//ios
          //对话框
          updateDialog : {
              //是否显示更新描述
              appendReleaseDescription : true ,
              //更新描述的前缀。 默认为"Description"
              descriptionPrefix : "更新内容：" ,
              //强制更新按钮文字，默认为continue
              mandatoryContinueButtonLabel : "立即更新" ,
              //强制更新时的信息. 默认为"An update is available that must be installed."
              mandatoryUpdateMessage : "必须更新后才能使用" ,
              //非强制更新时，按钮文字,默认为"ignore"
              optionalIgnoreButtonLabel : '稍后' ,
              //非强制更新时，确认按钮文字. 默认为"Install"
              optionalInstallButtonLabel : '后台更新' ,
              //非强制更新时，检查到更新的消息文本
              optionalUpdateMessage : '有新版本了，是否更新？' ,
              //Alert窗口的标题
              title : '更新提示'
          }
      });
      if (Platform.OS === 'android') {
          if (version !== new_version) {
              ToastShow.toastShort('已经是最新版本');
          } else {
              codePush.sync({
                  installMode: codePush.InstallMode.IMMEDIATE,
                  mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
                  //deploymentKey为刚才生成的,打包哪个平台的App就使用哪个Key,这里用IOS的打包测试
                  deploymentKey: key,
                  // deploymentKey: 'OFtMbneLRlcg-JDXuXvdJKFp9_3wf4eb6812-f373-4d7d-920c-619db1092814',//ios
                  //对话框
                  updateDialog : {
                      //是否显示更新描述
                      appendReleaseDescription : true ,
                      //更新描述的前缀。 默认为"Description"
                      descriptionPrefix : "更新内容：" ,
                      //强制更新按钮文字，默认为continue
                      mandatoryContinueButtonLabel : "立即更新" ,
                      //强制更新时的信息. 默认为"An update is available that must be installed."
                      mandatoryUpdateMessage : "必须更新后才能使用" ,
                      //非强制更新时，按钮文字,默认为"ignore"
                      optionalIgnoreButtonLabel : '稍后' ,
                      //非强制更新时，确认按钮文字. 默认为"Install"
                      optionalInstallButtonLabel : '后台更新' ,
                      //非强制更新时，检查到更新的消息文本
                      optionalUpdateMessage : '有新版本了，是否更新？' ,
                      //Alert窗口的标题
                      title : '更新提示'
                  }
              });
          }
      }else{
          // NativeModules.upgrade.upgrade('1297109983', (msg) => {
          //     if ('YES' == msg) {
          //         //跳转到APP Stroe
          //         NativeModules.upgrade.openAPPStore('1297109983');
          //     } else {
          //         ToastShow.toastShort('当前为最新版本');
          //     }
          // });
      }
  }

  //请求版本号
  version(version){
      this.setState({
         ready:false
      });
      Ajax.post('/site/app-update')
          .then((respones)=>{
              console.log(respones);
              if(respones.result*1===1){
                  let iosVersion = respones.data.ios_version.version_number;
                  let anVersion = respones.data.version.version_number;
                  this.setState({
                      apkUrl:respones.data.version.url
                  });
                  if(version){//判断版本号
                    this.versionUpdate(iosVersion);
                  }else{
                      this.saveVersion('version',iosVersion);//保存版本号
                  }
                  ToastShow.toastShort('已经是最新版本');
              }else{
                  ToastShow.toastShort(respones.msg);
              }
              this.setState({
                  ready:true,
              })
          })
          .catch(()=>{
              this.setState({
                  ready:true,
              })
          })
  }
  componentDidMount() {
      this.getVersion();
      this.emit = DeviceEventEmitter.addListener('LOAD_PROGRESS',(msg)=>{
          let title = "当前下载进度：" + msg;
          console.log(title);
          ToastAndroid.show(title, ToastAndroid.SHORT);
      });
  }
  componentWillUnmount(){
      this.emit&&this.emit.remove();
  };

  render() {
    const { navigate } = this.props.navigation;
    const { token } = this.props.state.login;
    const {ready,version} = this.state;

    return (
      <View style={common_css.container}>
        {ready?null:<Loading />}
        <ImageBackground style={mine_css.meTop} source={require('../img/wde_bg.png')} resizeMode='cover'>

          <View style={mine_css.meTopWrap}>
              <View style={mine_css.meTopImg}>
                  <Image source={token?require('../img/txiang2.png'):require('../img/txiang1.png')} style={mine_css.meImg} />
              </View>

              <TouchableOpacity
                  style={{flexDirection:'column',flex:1}}
                  onPress={()=>{
                      if(!token){
                          navigate('Login')
                      }else{
                          this.refs.user.getUser();
                      }
                    }}
              >

                  {token?<User token={token} ref={'user'}/>:<Text style={mine_css.meText1}>点击登录账号</Text>}

                  {!token&&<Text style={mine_css.meText2}>登录后更方便使用</Text>}
              </TouchableOpacity>
          </View>

        </ImageBackground>
        <View style={mine_css.meBottom}>

            {/*<TouchableOpacity*/}
                {/*style={mine_css.meBottomItem}*/}
                {/*onPress={()=>{*/}
                    {/*if(token&&this.refs.user&&this.refs.user.state.phone){*/}
                        {/*navigate('Vip',{*/}
                            {/*token:token,*/}
                            {/*name:this.refs.user.state.phone*/}
                        {/*})*/}
                    {/*}else{*/}
                        {/*ToastShow.toastShort('请登录')*/}
                    {/*}*/}
                {/*}}*/}
            {/*>*/}
                {/*<View style={mine_css.rowWrap}><Image source={require('../img/vip1.png')} style={mine_css.meIconImg}/>*/}
                {/*<Text style={mine_css.meItem}>VIP会员</Text></View>*/}
                {/*<Image source={require('../img/gd11.png')} style={mine_css.modifyImgIcon}/>*/}
            {/*</TouchableOpacity>*/}

            <TouchableOpacity style={mine_css.meBottomItem} onPress={()=>{navigate('Product')}}>
                <View style={mine_css.rowWrap}>
                    <Image source={require('../img/cpjs1.png')} style={mine_css.meIconImg}/>
                    <Text style={mine_css.meItem}>产品介绍</Text>
                </View>
                <Image source={require('../img/gd11.png')} style={mine_css.modifyImgIcon}/>
            </TouchableOpacity>

            <TouchableOpacity style={mine_css.meBottomItem} onPress={()=>{navigate('Customer_service')}}>
                <View style={mine_css.rowWrap}>
                    <Image source={require('../img/wdkf1.png')} style={mine_css.meIconImg}/>
                    <Text style={mine_css.meItem}>我的客服</Text>
                </View>
                <Image source={require('../img/gd11.png')} style={mine_css.modifyImgIcon}/>
            </TouchableOpacity>

            <TouchableOpacity style={mine_css.meBottomItem} onPress={()=>{navigate('Suggest',{token:token})}}>
                <View style={mine_css.rowWrap}>
                    <Image source={require('../img/yjfk1.png')} style={mine_css.meIconImg}/>
                    <Text style={mine_css.meItem}>意见反馈</Text>
                </View>
                <Image source={require('../img/gd11.png')} style={mine_css.modifyImgIcon}/>
            </TouchableOpacity>

            <TouchableOpacity style={mine_css.meBottomItem} onPress={()=>{this.version(1)}}>
                <View style={mine_css.rowWrap}>
                    <Image source={require('../img/bbgx1.png')} style={mine_css.meIconImg}/>
                    <Text style={mine_css.meItem}>版本更新</Text>
                </View>
                <View style={mine_css.rowWrap}>
                    <Text style={mine_css.smallFont}>当前版本 {version}</Text>
                    <Image source={require('../img/gd11.png')} style={mine_css.modifyImgIcon}/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={mine_css.meBottomItem} onPress={()=>{navigate('Setting')}}>
                <View style={mine_css.rowWrap}>
                    <Image source={require('../img/szhi1.png')} style={mine_css.meIconImg}/>
                    <Text style={mine_css.meItem}>设置</Text>
                </View>
                <Image source={require('../img/gd11.png')} style={mine_css.modifyImgIcon}/>
            </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const mapState = state => ({
  state
})


export default connect(mapState)(Mine)
