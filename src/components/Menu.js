import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';

const {width,height} = Dimensions.get('window');


export default class Menu extends Component {
    constructor(){
        super()
    }

    render() {

        return (
            <ScrollView style={styles.menu} scrollsToTop={false}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={require('../img/tx.png')}/>
                    <Text style={styles.nickName}>JD魔盒</Text>
                </View>
                <TouchableOpacity onPress={()=>this.props.onItemSelected('Ranking')} style={styles.item}>
                    <Image source={require('../img/xxi14.png')} style={styles.img}/>
                    <Text style={styles.itemText}>查排名</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.onItemSelected('Weight')} style={styles.item}>
                    <Image source={require('../img/xxi11.png')} style={styles.img}/>
                    <Text style={styles.itemText}>查权重</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.onItemSelected('Sales')} style={styles.item}>
                    <Image source={require('../img/xxi15.png')} style={styles.img}/>
                    <Text style={styles.itemText}>查销量</Text>
                </TouchableOpacity>

            </ScrollView>);
    }
}
const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#fff',
        padding: 20
    },
    avatarContainer: {marginBottom: 20, marginTop: 20,flexDirection: 'row',alignItems: 'center'},
    avatar: {width: 50, height: 50, borderRadius: 20,},
    nickName: {fontSize: 18,color:'#1e88f5',marginLeft: 10},
    item: {
        paddingTop: 20,paddingLeft:10,flexDirection: 'row',
        alignItems: 'center'
    },
    itemText:{
        fontSize: 16, fontWeight: '300',
        color:'#4a4a4a'
    },
    img:{
        width:18,
        height:18,
        marginRight: 10
    }
});