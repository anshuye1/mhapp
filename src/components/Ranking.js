import React, { Component } from 'react';
import { Text, View,Button,Image,Dimensions,TouchableOpacity,StyleSheet,TextInput,Animated,Easing, } from 'react-native';

const {width,height} = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [300, 214];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];

import Icon from 'react-native-vector-icons/FontAwesome';

import Filter from '../page/Filter';

export default class Vip extends Component {
    constructor(props){
        super(props);
        this.state={
            filter:false,
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            data:this.props.data||[]
        };
    }
    static navigationOptions = ({ navigation }) => ({
        header:null
    });

    //显示动画
    in() {
        this.setState({
           filter:true
        });
        Animated.parallel([
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 1,
                }
            )
        ]).start();
    };
    //隐藏动画
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            )
        ]).start();
        setTimeout(()=>this.setState({filter: false}),200)

    }

    render() {
        const {goBack} = this.props.navigation;
        const {filter} = this.state;

        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:1}} onPress={()=>goBack()}>
                        <Image source={require('../img/fhui1.png')} style={{width:25,height:25,marginLeft:5}}/>
                    </TouchableOpacity>
                    <View style={styles.header_wrap}>
                        <Text style={styles.header_text}>查排名</Text>
                    </View>
                    <View style={{justifyContent:'flex-end',flex:1,flexDirection:'row'}}>
                        <TouchableOpacity  onPress={()=>this.in()}>
                            <Image source={require('../img/sxuan2.png')} style={{width:25,height:25,marginRight:20}}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>alert(2)}>
                            <Image source={require('../img/flei2.png')} style={{width:25,height:25,marginRight:15}}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.headerBottom}>
                    <View style={styles.search}>
                        <Icon style={styles.searchIcon}
                              name="search"
                              size={18}
                              color="#8B8B8B" />
                        <TextInput
                            style={styles.input}
                            multiline = {true}
                            numberOfLines={1}
                            placeholder="关键词"
                            onChangeText={(text) => this.setState({text})}
                        />
                    </View>

                    <View style={styles.search}>
                        <Icon style={styles.searchIcon}
                              name="search"
                              size={18}
                              color="#8B8B8B" />
                        <TextInput
                            style={styles.input}
                            multiline = {true}
                            placeholder="sku或商品链接"
                            numberOfLines={1}
                            onChangeText={(text) => this.setState({text})}
                        />
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                        <Text style={[styles.filterFont,styles.filterFont1]}>pc</Text>
                        <Text style={styles.filterFont}>指定商品</Text>
                        <Text style={styles.filterFont}>综合</Text>
                        <Text style={styles.filterFont}>1-50页</Text>
                        <Text style={styles.filterFont}>300-500元</Text>
                        <Text style={styles.filterFont}>浙江</Text>
                    </View>


                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                        <TouchableOpacity
                            style={{backgroundColor:'#fff',width:100,borderRadius:4}}
                            onPress={()=>alert('查询')}
                        >
                            <Text style={{color:'#1e88f5',fontSize:18,textAlign:'center',lineHeight:40,height:40,}}>查询</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginRight:-50,marginLeft:10}} onPress={()=>alert('历史纪录')}>
                            <Text style={{color:'#fff',fontSize:16,textAlign:'center',lineHeight:40,height:40}}>历史记录</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {filter&&<View style={styles.wrap}>
                    <Animated.View style={ styles.mask }>
                        <TouchableOpacity onPress={()=>this.out()} style={{width:width,height:height}}>

                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.tip , {transform: [{
                            translateY: this.state.offset.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height,200]
                            }),
                        }]
                    }]}>
                        <Filter />
                    </Animated.View>
                </View>}
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
        flex:2,
    },
    header_text:{
        color:'#fff',
        fontSize:20,
        fontWeight:'600',
        textAlign:'center'
    },
    headerBottom:{
      backgroundColor:'#1e88f5',
      width:width,
        paddingLeft:50,
        paddingRight:50,
        paddingTop:10,
        padding:20
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        paddingTop:8,
        paddingBottom:8
    },
    input:{
        flex:1,
        padding: 0,
        lineHeight:25,
        fontSize:18,
        color:'#666'
    },
    searchIcon: {
        paddingLeft: 10,
        paddingRight: 10,
        color:'#B0B0B0'
    },
    filterFont:{
        fontSize:15,
        color:'#fff'
    },
    filterFont1:{
      color:'#F8E71C'
    },
    wrap:{
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
    },
    mask: {
        justifyContent:"center",
        backgroundColor:"#000",
        opacity:0.3,
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
    },
    tip:{
        flex:1,
        backgroundColor:'#fff',
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        padding:15,
    }
});