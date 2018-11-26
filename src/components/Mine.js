import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';


import User from "./User";
import Ajax from "../common/Ajax";


const {width,height} = Dimensions.get('window');

class Mine extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

  }
  componentDidMount() {
  }

  render() {
    const { navigate } = this.props.navigation;
    const { token } = this.props.state.login;

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.top} source={require('../img/wde_bg.png')} resizeMode='cover'>

          <View style={styles.topWrap}>
              <View style={styles.topImg}>
                  <Image source={token?require('../img/txiang2.png'):require('../img/txiang1.png')} style={{ width: 80, height: 80 }} />
              </View>

              <TouchableOpacity
                  style={{flexDirection:'column'}}
                  onPress={()=>{
                      if(!token){
                          navigate('Login')
                      }
                    }}
              >

                  {token?<User token={token}/>:<Text style={{ fontSize: 18, color: '#9B9B9B' }}>点击登录账号</Text>}

                  {!token&&<Text style={{fontSize:12,color:'#9B9B9B',marginTop:3}}>登录后更方便使用</Text>}
              </TouchableOpacity>
          </View>

        </ImageBackground>
        <View style={styles.bottom}>

            <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Vip')}}>
                <View><Image source={require('../img/vip1.png')} style={styles.iconImg}/></View>
                <Text style={styles.item}>VIP会员</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Product')}}>
                <View><Image source={require('../img/cpjs1.png')} style={styles.iconImg}/></View>
                <Text style={styles.item}>产品介绍</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Customer_service')}}>
                <View><Image source={require('../img/wdkf1.png')} style={styles.iconImg}/></View>
                <Text style={styles.item}>我的客服</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Suggest')}}>
                <View><Image source={require('../img/yjfk1.png')} style={styles.iconImg}/></View>
                <Text style={styles.item}>意见反馈</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Version')}}>
                <View><Image source={require('../img/bbgx1.png')} style={styles.iconImg}/></View>
                <Text style={styles.item}>版本更新</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Setting')}}>
                <View><Image source={require('../img/szhi1.png')} style={styles.iconImg}/></View>
                <Text style={styles.item}>设置</Text>
            </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F3F5',
  },
  top: {
      width:width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3F5',
    height:137,
      marginBottom:60,
    justifyContent:'space-around'
  },
  topWrap:{
    backgroundColor:'#fff',
    justifyContent:'flex-start',
    flexDirection:'row',
    width:width*0.9,
    borderRadius:8,
    height:115,
      marginTop:120,
    alignItems:'center'
  },
  topImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal: 20,
    overflow: 'hidden'
  },
  bottom: {
    flex: 2
  },
  bottomItem:{
   height:52,
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
    fontSize:16,
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
})

const mapState = state => ({
  state
})


export default connect(mapState)(Mine)
