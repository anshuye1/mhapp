import React, { Component } from 'react';
import { Text, View,Button,Image,Dimensions,TouchableOpacity,StyleSheet } from 'react-native';

const {width,height} = Dimensions.get('window');

export default class Vip extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render() {
        const {goBack,navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:0}} onPress={()=>goBack()}>
                        <Image source={require('../img/logo11.png')} style={{width:30,height:30,marginLeft:8}}/>
                    </TouchableOpacity>
                    <View style={styles.header_wrap}>
                        <Text style={styles.header_text}>消息</Text>
                    </View>
                </View>


                <View style={styles.bottom}>

                    <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Product')}}>
                        <View><Image source={require('../img/xxi11.png')} style={styles.iconImg}/></View>
                        <Text style={styles.item}>京东魔盒PC端说明</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Customer_service')}}>
                        <View><Image source={require('../img/xxi12.png')} style={styles.iconImg}/></View>
                        <Text style={styles.item}>京东商家须知</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Suggest')}}>
                        <View><Image source={require('../img/xxi13.png')} style={styles.iconImg}/></View>
                        <Text style={styles.item}>双11到啦</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Version')}}>
                        <View><Image source={require('../img/xxi14.png')} style={styles.iconImg}/></View>
                        <Text style={styles.item}>如何提升排名</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Setting')}}>
                        <View><Image source={require('../img/xxi15.png')} style={styles.iconImg}/></View>
                        <Text style={styles.item}>如何提升销量</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomItem} onPress={()=>{navigate('Setting')}}>
                        <View><Image source={require('../img/xxi16.png')} style={styles.iconImg}/></View>
                        <Text style={styles.item}>如何提升流量</Text>
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
        flex:1,paddingRight:38
    },
    header_text:{
        color:'#fff',fontSize:18,fontWeight:'600',textAlign:'center'
    },
    bottom: {
        flex: 1
    },
    bottomItem:{
        height:62,
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
});