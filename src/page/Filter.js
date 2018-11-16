import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ScrollView
} from 'react-native';

const {width,height} = Dimensions.get('window');

export default class RanItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minVal:1,
            maxVal:50
        }
    };

    render(){
        const {minVal,maxVal} = this.state;

        return (
            <ScrollView style={styles.filterWrap}>
                <View style={styles.optionItem}>
                    <Text style={styles.name}>查询入口：</Text>
                    <TouchableOpacity><Text style={styles.btn}>pc端</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.btn}>app端</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.btn}>微信端</Text></TouchableOpacity>
                </View>
                <View style={styles.optionItem}>
                    <Text style={styles.name}>查询模式：</Text>
                    <TouchableOpacity><Text style={styles.btn}>指定商品</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.btn}>指定店铺</Text></TouchableOpacity>
                </View>
                <View style={styles.optionItem}>
                    <Text style={styles.name}>排序方式：</Text>
                    <TouchableOpacity><Text style={styles.btn}>pc端</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.btn}>app端</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.btn}>微信端</Text></TouchableOpacity>
                </View>
                <View style={styles.optionItem}>
                    <Text style={styles.name}>页码区间：</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <TouchableOpacity><Text style={styles.btn}>综合</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.btn}>销量</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.btn}>评论数</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.btn}>新品</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.btn}>价格</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.optionItem}>
                    <Text style={styles.name}>页面区间：</Text>
                    <TextInput
                        style={styles.num_input}
                        numberOfLines={1}
                        value={minVal.toString()}
                    />
                    <Text style={styles.line}>--</Text>
                    <TextInput
                        style={styles.num_input}
                        numberOfLines={1}
                        value={maxVal.toString()}
                    />
                </View>
                <View style={styles.optionItem}>
                    <View style={styles.name}>
                        <Text style={{fontSize:16,paddingTop:8}}>价格区间：</Text>
                        <Text>(选填)</Text>
                    </View>
                    <TextInput
                        style={styles.num_input}
                        numberOfLines={1}
                    />
                    <Text style={styles.line}>--</Text>
                    <TextInput
                        style={styles.num_input}
                        numberOfLines={1}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    filterWrap:{
        flex:1,
        padding:10
    },
    optionItem:{
        flexDirection:'row',
    },
    btn:{
        width:72,
        height:40,
        borderWidth:1,
        borderColor:'#ddd',
        textAlign:'center',
        lineHeight:38,
        borderRadius:8,
        marginRight:15,
        fontSize:14,
        marginBottom:10
    },
    name:{
        fontSize:16,
        lineHeight:40,
        color:'#4a4a4a',
        marginRight:10,
        flexDirection:'column',
        alignItems:'center'
    },
    num_input:{
        width:75,
        textAlign:'center',
        marginRight:5,
        borderColor:'#C7C7C7',
        borderWidth:1,
        borderRadius:8,
        fontSize:14,
        padding:5,
        marginBottom:10
    },
    line:{
        lineHeight:40,
        color:'#C7C7C7',
        marginRight:5
    }
});