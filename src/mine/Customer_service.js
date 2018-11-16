import React, { Component } from 'react';
import { Text, View,Button,Image,Dimensions,TouchableOpacity,StyleSheet } from 'react-native';

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
                        <Text style={styles.header_text}>我的客服</Text>
                    </View>
                </View>
                <Text>Hello world!</Text>
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