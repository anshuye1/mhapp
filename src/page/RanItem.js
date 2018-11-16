import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class RanItem extends Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        item:{},
        data:[]
    };
    render(){
        const {item,data,navigate} = this.props;
        return (
            <TouchableOpacity
                style={[
                    styles.SkuList, item.key + 1 == data.length && styles.lastList
                ]}
                onPress={() => navigate('Ranking', {
                    id: item.value.id,
                    callback: (data) => {
                        this.setState({ childState: data })
                    }
                })}
            >
                <View style={{
                    flex: 0
                }}>
                    <Image source={{
                        uri: 'https://img13.360buyimg.com/n1/s450x450_jfs/t25075/312/1904738735/406912/ff77e158/5bbf19ccN5af1e7f5.jpg'||item.value.images.large
                    }} style={{
                        width: 130,
                        height: 130
                    }} />
                </View>
                <View style={{
                    height: 130,
                    flex: 2,
                    paddingLeft:14,
                    alignItems: 'flex-start',
                }}>

                    <Text style={styles.title} numberOfLines={1}>{'华为 HUAWEI Mate 20 Pro 麒麟980芯片全面屏超微距影像超大广角徕卡三摄6GB+128GB亮黑色全网通版双4G手机'||item.value.title}
                    </Text>


                    <View style={styles.itemWrap}>
                        <Text style={{fontSize:18,color:'#FF314B',width:150}}>￥ 5399.00</Text>
                        <Text style={{fontSize:14,color:'#9B9B9B',textAlign:'right',flex:1,lineHeight:25}}>11/01 14:17</Text>
                    </View>


                    <View style={styles.itemWrap}>
                        <View style={{width:100,flexDirection:'row'}}>
                            <Text style={{color:'#1e88f5',backgroundColor:'#EAF4FF',flex:0}} numberOfLines={1}>pc浙江</Text>
                        </View>
                        <Text style={styles.right} numberOfLines={1}>8GB+256GB 标准版 黑亮色</Text>
                    </View>

                    <View style={[styles.itemWrap,styles.itemWrap1]}>
                        <Text style={styles.left} numberOfLines={1}>
                            手机
                        </Text>
                        <Text style={styles.right} numberOfLines={1}>sku:100000986038</Text>
                    </View>

                    <View style={styles.itemWrap}>
                        <Text style={styles.left} numberOfLines={1}>
                            第1页-45个
                        </Text>
                        <Text style={styles.right} numberOfLines={1}>排名：<Text style={{color:'#FF314B'}}>45</Text></Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    SkuList: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF'
    },
    lastList: {
        borderBottomWidth: 0
    },
    title: {
        fontSize: 16,
        color:'#4A4A4A'
    },
    right:{
        flex:1,paddingLeft:20,flexDirection:'row',color:'#555'
    },
    left:{
        width:100,
        color:'#555'
    },
    itemWrap: {
        display:'flex',
        flexDirection: 'row',
        marginTop: 4,
    },
    itemWrap1: {
        marginTop:10
    },
});