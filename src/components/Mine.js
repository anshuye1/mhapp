import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    Platform
} from 'react-native';
import { connect } from 'react-redux';


import User from "./User";
import Ajax from "../common/Ajax";
import mine_css from "../css/mine_css";
import ToastShow from "../common/Toast";
import Loading from "../common/Loading";
import common_css from "../css/common_css";


const {width,height} = Dimensions.get('window');

class Mine extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
        ready:true,
        version:''
    }

  }
  version(version){
      this.setState({
         ready:false
      });
      Ajax.post('/site/app-update')
          .then((respones)=>{
              if(respones.result*1===1){
                  let iosVersion = respones.data.ios_version.version_number;
                  let anVersion = respones.data.version.version_number;
                  if(this.state.version === iosVersion||this.state.version === anVersion){
                      ToastShow.toastShort('当前为最新版本')
                  }else{
                      this.setState({
                          version:Platform.OS==='ios'?iosVersion:iosVersion
                      })
                  }
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
      this.version()
  }

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

            <TouchableOpacity
                style={mine_css.meBottomItem}
                onPress={()=>{
                    if(token&&this.refs.user&&this.refs.user.state.phone){
                        navigate('Vip',{
                            token:token,
                            name:this.refs.user.state.phone
                        })
                    }else{
                        ToastShow.toastShort('请登录')
                    }
                }}
            >
                <View style={mine_css.rowWrap}><Image source={require('../img/vip1.png')} style={mine_css.meIconImg}/>
                <Text style={mine_css.meItem}>VIP会员</Text></View>
                <Image source={require('../img/gd11.png')} style={mine_css.modifyImgIcon}/>
            </TouchableOpacity>

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
