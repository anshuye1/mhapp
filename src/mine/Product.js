import React, { Component } from 'react';
import { Text, View,ScrollView,Image,Dimensions,TouchableOpacity,StyleSheet } from 'react-native';

const {width,height} = Dimensions.get('window');

export default class Vip extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render() {
        const {goBack} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:0}} onPress={()=>goBack()}>
                        <Image source={require('../img/fhui1.png')} style={{width:20,height:20,marginLeft:5}}/>
                    </TouchableOpacity>
                    <View style={styles.header_wrap}>
                        <Text style={styles.header_text}>产品介绍</Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={{backgroundColor:'#fff',width:width-32,margin:16,padding:20,borderRadius:8}}>
                        <View style={{marginBottom:25}}>
                            <Text style={styles.fontWrap}><Text style={styles.red}>*</Text> 注册会员   <Text style={styles.red}>试用会员</Text></Text>
                            <Text style={styles.fontWrap}><Text style={styles.red}>*</Text> 注册并绑定店   <Text style={styles.red}>普通会员</Text></Text>
                            <Text style={styles.fontWrap}><Text style={styles.red}>*</Text> 邀请1人注册并绑定店铺   <Text style={styles.red}>VIP1会员</Text></Text>
                            <Text style={styles.fontWrap}><Text style={styles.red}>*</Text> 邀请3人注册并绑定店铺   <Text style={styles.red}>VIP2会员</Text></Text>
                            <Text style={styles.fontWrap}><Text style={styles.red}>*</Text> 邀请10人注册并绑定店铺   <Text style={styles.red}>VIP3会员</Text></Text>

                        </View>

                        <View style={{marginBottom:25}}>
                            <Text style={styles.fontWrap1}><Text style={styles.blue}>1.邀请好友注册账号需绑定店铺</Text>才算一个有效用户（一个店铺可以绑定多个账号）;</Text>
                            <Text style={styles.fontWrap1}><Text style={styles.blue}>2.好友之间邀请关系</Text>——被邀请人与邀请人绑定的店铺不可为同一个，比如A商家邀请B、C、D商家，A、B、C、D商家绑定的店铺不可相同</Text>
                                <Text style={styles.fontWrap1}><Text style={styles.blue}>3.两个方式所获得的权限可相互叠加</Text>——用户权限=付费订购权限+邀请获得的权限。</Text>
                        </View>


                        <Text style={[styles.fontWrap1,styles.blue]}>版本更新后会员权益说明：</Text>
                        <Text style={styles.fontWrap1}>1.版本更新后老客户会员等级永久保留，会员时间到期后自动降为普通会员，再次邀请好友绑定店铺会员权益在之前的等级上计算。</Text>
                        <Text style={styles.fontWrap1}>2.对剩余邀请好友绑定店铺数进行新业务逻辑计算（如普通会员之前邀请了5个好友绑定店铺，版本更新后VIP2会员在原来基础上增加两个月的使用时长。</Text>
                        <Text style={styles.fontWrap1}>3.每邀请一个好友注册并绑定店铺赠送会员时长1个月。</Text>
                        <Text style={styles.fontWrap1}>4.邀请好友绑定店铺数分别是1 3 10时，会员等级分别调整为VIP1 VIP2 VIP3，会员时间也随之变动（如普通会员邀请3个好友，获得VIP2等级3个月使用时长）。</Text>

                        <Text style={{textAlign:'right',marginTop:20,marginBottom:20}}>
                            2018.12.12更新
                        </Text>
                    </View>
                </ScrollView>
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
        backgroundColor:'#288EF7',
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

    red:{
      color:'#FF4359'
    },
    blue:{
        color:'#288EF7'
    },
    fontWrap:{
        fontSize:15,
        color:'#4A4A4A',
        flexDirection:'row',
        lineHeight:25,
        fontWeight:'600'
    },
    fontWrap1:{
        fontSize:16,
        color:'#4A4A4A',
        flexDirection:'row',
        lineHeight:25
    }
});
