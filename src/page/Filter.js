import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ScrollView,
    Picker
} from 'react-native';
import Ajax from '../common/Ajax'
const {width,height} = Dimensions.get('window');

export default class RanItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus:0,
            cityName:'',
            formData:{
                ...this.props.formData,
            }
        }
    }

    componentDidMount(){

    }

    render(){
        const {formData} = this.state;
        const {entranceObj,typeObj,sortObj,defaultVal,cityArr} = this.props;

        return (
            <View style={styles.filterWrap}>
                <ScrollView style={{height:height-150}}>
                <View style={styles.optionItem}>
                    <Text style={styles.name}>查询入口：</Text>
                    {Object.keys(entranceObj).map((item)=>{
                        return (
                            <TouchableOpacity key={item} onPress={()=>{
                                this.setState({
                                    formData:{
                                        ...formData,
                                        entrance:item,
                                    }
                                })
                            }}>
                                <Text style={[styles.btn,formData.entrance==item?styles.active:{}]}>{entranceObj[item]}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={styles.optionItem}>
                    <Text style={styles.name}>查询模式：</Text>
                    {Object.keys(typeObj).map((item)=>{
                        return (
                            <TouchableOpacity key={item} onPress={()=>{
                                this.setState({
                                    formData:{
                                        ...formData,
                                        type:item,
                                    }
                                })
                            }}>
                                <Text style={[styles.btn,formData.type==item?styles.active:{}]}>{typeObj[item]}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={styles.optionItem}>
                    <Text style={styles.name}>页码区间：</Text>
                    <View style={styles.btnBox}>
                        {Object.keys(sortObj).map((item)=>{
                            return (
                                <TouchableOpacity key={item} onPress={()=>{
                                    this.setState({
                                        formData:{
                                            ...formData,
                                            sort:item,
                                        }
                                    })
                                }}>
                                    <Text style={[styles.btn,formData.sort==item?styles.active:{}]}>{sortObj[item]}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.optionItem}>
                    <Text style={styles.name}>页面区间：</Text>
                    <TextInput
                        style={styles.num_input}
                        numberOfLines={1}
                        maxLength={3}
                        value={formData.page.toString()}
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => {
                            this.setState({ formData:{...formData,page:text} })
                        }}
                        // onBlur={()=>{
                        //     if(formData.page*1>formData.page_max*1){
                        //         this.setState({ formData:{...formData,page:formData.page_size} })
                        //     }
                        // }}
                    />
                    <Text style={styles.line}>--</Text>
                    <TextInput
                        style={styles.num_input}
                        numberOfLines={1}
                        maxLength={3}
                        value={formData.page_size.toString()}
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => {
                            this.setState({ formData:{...formData,page_size:text} })
                        }}
                        // onBlur={()=>{
                        //     if(formData.page_size*1<formData.page_size*1){
                        //         this.setState({ formData:{...formData,page_size:formData.page} })
                        //     }
                        // }}
                    />
                </View>
                <View style={styles.optionItem}>
                    <View style={styles.name}>
                        <Text style={[{paddingTop:8},styles.nameFont]}>价格区间：</Text>
                        <Text style={{fontSize:12}}>(选填)</Text>
                    </View>
                    <TextInput
                        style={styles.num_input}
                        numberOfLines={1}
                        maxLength={10}
                        value={formData.price_min.toString()}
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => {
                            this.setState({ formData:{...formData,price_min:text} })
                        }}
                    />
                    <Text style={styles.line}>--</Text>
                    <TextInput
                        style={styles.num_input}
                        numberOfLines={1}
                        maxLength={10}
                        value={formData.price_max.toString()}
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => {
                            this.setState({ formData:{...formData,price_max:text} })
                        }}
                    />
                </View>
                <View style={styles.optionItem}>
                    <View style={[styles.name,{width:120}]}>
                        <Text style={[{paddingTop:8},styles.nameFont]}>按地区（选填）：</Text>
                    </View>
                    <View style={[styles.btnBox,{width:100,height:35,backgroundColor:'#1e88f5',borderRadius:8}]}>
                        <Picker
                            selectedValue={this.state.formData.city_id}
                            style={{ height: 35, width: 100,color:'#fff'}}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                formData: {
                                    ...formData,
                                    city_id:itemValue
                                },
                                cityName:itemIndex
                            })}
                        >
                            <Picker.Item label="选择地区" value=""/>
                            {cityArr&&cityArr.map((item)=>{
                                return (
                                    <Picker.Item label={item.cityName} value={item.id} key={item.id}/>
                                )
                            })}

                        </Picker>
                    </View>
                </View>

                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',paddingTop:20}}>
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({
                                formData:{
                                    ...defaultVal
                                }
                            })
                        }}
                    >
                        <Text style={styles.bottomBtn}>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            this.props.submitFun()
                        }}
                    >
                        <Text style={styles.bottomBtn1}>确定</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    filterWrap:{
        flex:1,
        padding:5,
        flexDirection:'row'
    },
    optionItem:{
        width:width,
        flexDirection:'row',
        marginBottom:8
    },
    btnBox:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:width-80-20
    },
    cityBox:{
        flex:1,
        height:200
    },
    cityBtn:{
        flexWrap:'wrap',
        padding:30,
        flex:1,
        flexDirection:'row',
        height:150,
    },
    btn:{
        width:70,
        height:35,
        borderWidth:1,
        borderColor:'#ddd',
        textAlign:'center',
        lineHeight:35,
        borderRadius:8,
        marginRight:15,
        fontSize:14,
        marginBottom:10
    },
    active:{
        backgroundColor:'#1e88f5',
        color:'#fff',
        borderColor:'#1e88f5',
    },
    btnActive:{
        width:70,
        height:35,
        borderWidth:1,
        borderColor:'#1e88f5',
        backgroundColor:'#1e88f5',
        textAlign:'center',
        lineHeight:35,
        borderRadius:8,
        marginRight:10,
        color:'#fff',
        fontSize:14,
        marginBottom:10,
    },
    name:{
        fontSize:14,
        lineHeight:35,
        color:'#4a4a4a',
        flexDirection:'column',
        alignItems:'center',
        width:80,
        textAlign:'center',
    },
    nameFont:{
        fontSize:14,
        color:'#4a4a4a',
    },
    num_input:{
        width:70,
        height:35,
        textAlign:'center',
        marginRight:5,
        borderColor:'#C7C7C7',
        borderWidth:1,
        borderRadius:8,
        fontSize:14,
        marginBottom:8,
        alignItems:'center',
    },
    line:{
        lineHeight:35,
        color:'#C7C7C7',
        marginRight:5
    },
    bottomBtn:{width:90,height:40,borderTopLeftRadius:8,borderBottomLeftRadius:8,backgroundColor:'#F5A623',color:'#fff',lineHeight:36,textAlign:'center',fontSize:16,marginRight:1},
    bottomBtn1:{width:90,height:40,borderTopRightRadius:8,borderBottomRightRadius:8,backgroundColor:'#FF465D',color:'#fff',lineHeight:36,textAlign:'center',fontSize:16}
});