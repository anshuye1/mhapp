import React, { Component } from 'react';
import {AsyncStorage, Dimensions, View,FlatList,ActivityIndicator,Text,Image,TouchableOpacity,BackHandler} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { doLogin } from '../store/actions/login';
import * as types from "../store/constants";

import RanList from '../page/RanList';
import ToastShow from '../common/Toast';
import common_css from '../css/common_css';
import SearchInput from './SearchInput';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import good_css from "../css/good_css";

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
            <TouchableOpacity style={good_css.ViewLoginOut} onPress={()=>{
                this.props.navigation.navigate('Login')
            }}>
                <Image source={require('../img/kbai1.png')} style={good_css.outImg}/>
                <Text style={good_css.outText}>登录状态下 PC端查询的历史数据会同步到这里哦，<Text style={good_css.blueText}>去登录</Text></Text>
            </TouchableOpacity>
        );

        return (
            <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <View style={[common_css.container1,common_css.iphoneX]}>
                    {
                        this.state.isOpen?
                            <View style={good_css.wrapper}>
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
                        renderTabBar={() => <DefaultTabBar style={good_css.tab}/>}
                        tabBarUnderlineStyle={good_css.tabBar}
                        onChangeTab = {(obj)=>{this.setState({type:(obj.i*1+1)})}}
                        tabBarBackgroundColor='#1e88f5'
                        tabBarActiveTextColor='#fff'
                        tabBarInactiveTextColor='#fff'
                        tabBarTextStyle={good_css.tabFont}
                        locked={false}
                    >
                        <View tabLabel='查排名' style={good_css.tabItem}>
                            {token
                                ?<RanList token={token} type={'1'} navigation={this.props.navigation} ref="ranList" token_Del={this.token_Del.bind(this)}/>
                                :ViewLoginOut
                            }
                        </View>

                        <View tabLabel='查权重' style={good_css.tabItem} onPress={()=>{this.setState({type:2})}}>
                            {token
                                ?<RanList token={token} type={'2'} navigation={this.props.navigation} ref="WeiList" token_Del={this.token_Del.bind(this)}/>
                                :ViewLoginOut
                            }
                        </View>

                        <View tabLabel='查销量' style={good_css.tabItem} onPress={()=>{this.setState({type:3})}}>
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