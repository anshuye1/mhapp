import React, { Component } from 'react';
import {AsyncStorage, Dimensions, View,FlatList,ActivityIndicator,Text,Image,TouchableOpacity,BackHandler} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { doLogin } from '../store/actions/login';
import * as types from "../store/constants";

import RanList from '../page/RanList';
import ToastShow from '../common/Toast';
import SearchInput from './SearchInput';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';

const { width, height } = Dimensions.get('window');

class skuList extends Component {
    constructor(props){
        super(props);
        this.state = {
            skuArr:[],
            refreshing:false,
            ready:true,
            type:1,
            isOpen: false,
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
        const {token} = this.props.state.login;
        if(token){
            if(type==1){
                this.refs.ranList.refreshData(type,content);
            }
            if(type==2){
                this.refs.WeiList.refreshData(type,content);
            }
            if(type==3){
                this.refs.SalList.refreshData(type,content);
            }
        }else{
            ToastShow.toastShort('请登录')
        }
    }
    delShow (){
        const {type} = this.state;
        const {token} = this.props.state.login;
        if(token){
            if(type==1){
                this.refs.ranList.delShow();
            }
            if(type==2){
                this.refs.WeiList.delShow();
            }
            if(type==3){
                this.refs.SalList.delShow();
            }
        }else{
            ToastShow.toastShort('请登录')
        }
    }
    //token置失效
    token_Del(){
        this.props.login('');
        this.setState({
            token:''
        })
    }

    toggle() {
        this.setState({isOpen: !this.state.isOpen,});
    }

    updateMenuState(isOpen) {
        this.setState({isOpen: isOpen,})
    }

    onMenuItemSelected(url){
        this.setState({
            isOpen:false
        },()=>{
            this.props.navigation.navigate(url,{
                item:{}
            })
        });
    }

    goBack(){
        console.log(213);
        this.props.navigation.goBack();
    }

    componentDidMount(){
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if(this.props.navigation.isFocused()){
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {//按第二次的时候，记录的时间+2000 >= 当前时间就可以退出
                    //最近2秒内按过back键，可以退出应用。
                    BackHandler.exitApp();//退出整个应用
                    return false
                }
                this.lastBackPressed = Date.now();//按第一次的时候，记录时间
                ToastShow.toastShort('再按一次退出应用');//显示提示信息
                return true;
            }
        });

        this.getToken();
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        const {token} = this.props.state.login;
        const {navigate} = this.props.navigation;
        console.log(token);

        const menu = <Menu navigate={navigate} onItemSelected={this.onMenuItemSelected.bind(this)}/>;

        const ViewLoginOut = (
            <TouchableOpacity style={{flexDirection:'column',justifyContent:'center',alignItems:'center',height:height-180}} onPress={()=>{
                this.props.navigation.navigate('Login')
            }}>
                <Image source={require('../img/kbai1.png')} style={{width:105,height:75}}/>
                <Text style={{fontSize:14,flexWrap:'nowrap',width:width*0.8,marginTop:20,color:'#BDBDBD'}}>登录状态下 PC端查询的历史数据会同步到这里哦，<Text style={{color:'#1e88fe'}}>去登录</Text></Text>
            </TouchableOpacity>
        );

        return (
            <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <View style={{ width: width, height: height, backgroundColor: '#fff' }}>
                    {
                        this.state.isOpen?
                            <View style={{position: 'absolute',top:0,left:0,zIndex: 1,backgroundColor:'rgba(0,0,0,0.3)',width:width,height:height}}>
                                <Text></Text>
                            </View>
                            :null
                    }

                    <SearchInput
                        navigation={this.props.navigation}
                        searchData={this.searchData.bind(this)}
                        delShow={this.delShow.bind(this)}
                        toggle={this.toggle.bind(this)}
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
                                ?<RanList token={token} type={'1'} navigation={this.props.navigation} ref="ranList" token_Del={this.token_Del.bind(this)}/>
                                :ViewLoginOut
                            }
                        </View>

                        <View tabLabel='查权重' style={{ marginBottom: 50 }} onPress={()=>{this.setState({type:2})}}>
                            {token
                                ?<RanList token={token} type={'2'} navigation={this.props.navigation} ref="WeiList" token_Del={this.token_Del.bind(this)}/>
                                :ViewLoginOut
                            }
                        </View>

                        <View tabLabel='查销量' style={{ marginBottom: 50 }} onPress={()=>{this.setState({type:3})}}>
                            {token
                                ?<RanList token={token} type={'3'} navigation={this.props.navigation} ref="SalList" token_Del={this.token_Del.bind(this)}/>
                                :ViewLoginOut
                            }
                        </View>

                    </ScrollableTabView>
                </View>
            </SideMenu>
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