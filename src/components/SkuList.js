import React, { Component } from 'react';
import {AsyncStorage, Dimensions, View,FlatList,ActivityIndicator,Text,Image,TouchableOpacity} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { doLogin } from '../store/actions/login';
import * as types from "../store/constants";

import RanList from '../page/RanList';
import WeiList from '../page/WeiList';
import SalList from '../page/SalList';
import SearchInput from './SearchInput';

const { width, height } = Dimensions.get('window');
let totalPage=20;
class skuList extends Component {
    constructor(props){
        super(props);
        this.state = {
            skuArr:[],
            refreshing:false,
            ready:true,
            type:1
        };
    }
    static navigationOptions = {
        header: null
    };
    getToken (){
        AsyncStorage.getItem('token').then((value) => {
            this.props.login(value);
        });
    }
    //搜索
    searchData (content){
        const {type} = this.state;
        if(type==1){
            this.refs.ranList.refreshData(type,content);
        }
        if(type==2){
            this.refs.WeiList.refreshData(type,content);
        }
        if(type==3){
            this.refs.SalList.refreshData(type,content);
        }
    }
    delShow (){
        const {type} = this.state;
        if(type==1){
            this.refs.ranList.delShow();
        }
        if(type==2){
            this.refs.WeiList.delShow();
        }
        if(type==3){
            this.refs.SalList.delShow();
        }
    }
    //token置失效
    token_Del(){
        // this.props.login('');
        // this.setState({
        //     token:''
        // })
    }

    componentDidMount(){
        this.getToken();
    }
    render() {
        const {token} = this.props.state.login;
        console.log(token);
        const ViewLoginOut = (
            <TouchableOpacity style={{flexDirection:'column',justifyContent:'center',alignItems:'center',height:500}} onPress={()=>{
                this.props.navigation.navigate('Login')
            }}>
                <Image source={require('../img/kbai1.png')} style={{width:105,height:75}}/>
                <Text style={{fontSize:14,flexWrap:'nowrap',width:width*0.8,marginTop:20,color:'#BDBDBD'}}>登录状态下 PC端查询的历史数据会同步到这里哦，<Text style={{color:'#1e88fe'}}>去登录</Text></Text>
            </TouchableOpacity>
        );

        return (
            <View style={{ width: width, height: height, backgroundColor: '#fff' }}>
                <SearchInput
                    navigation={this.props.navigation}
                    searchData={this.searchData.bind(this)}
                    delShow={this.delShow.bind(this)}
                />
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar style={{height:45}}/>}
                    tabBarUnderlineStyle={{
                        backgroundColor: '#f5f5f5',
                        height: 3
                    }}
                    onChangeTab = {(obj)=>{this.setState({type:(obj.i*1+1)})}}
                    tabBarBackgroundColor='#1e88f5'
                    tabBarActiveTextColor='#fff'
                    tabBarInactiveTextColor='#fff'
                    tabBarTextStyle={{ fontSize: 16,paddingTop:5 }}
                    locked={false}
                >
                    <View tabLabel='查排名' style={{ marginBottom: 50 }}>
                        {token
                            ?<RanList token={token} navigation={this.props.navigation} ref="ranList" token_Del={this.token_Del.bind(this)}/>
                            :ViewLoginOut
                        }
                    </View>

                    <View tabLabel='查权重' style={{ marginBottom: 50 }} onPress={()=>{this.setState({type:2})}}>
                        {token
                            ?<WeiList token={token} navigation={this.props.navigation} ref="WeiList" token_Del={this.token_Del.bind(this)}/>
                            :ViewLoginOut
                        }
                    </View>

                    <View tabLabel='查销量' style={{ marginBottom: 50 }} onPress={()=>{this.setState({type:3})}}>
                        {token
                            ?<SalList token={token} navigation={this.props.navigation} ref="SalList" token_Del={this.token_Del.bind(this)}/>
                            :ViewLoginOut
                        }
                    </View>

                </ScrollableTabView>
            </View>
        );
    }
}


const mapState = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    login: (payload) => dispatch(doLogin(payload))
})


export default connect(mapState,mapDispatchToProps)(skuList)