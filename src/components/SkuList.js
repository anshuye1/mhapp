import React, { Component } from 'react';
import {AsyncStorage, Dimensions, View} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { doLogin } from '../store/actions/login';
import * as types from "../store/constants";

import RanList from '../page/RanList';
import WeiList from '../page/WeiList';
import SalList from '../page/SalList';
import SearchInput from './SearchInput';

const { width, height } = Dimensions.get('window');

class skuList extends Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        header: null
    };
    getKey = ()=>{
        AsyncStorage.getItem('token').then((value) => {
            if(value){
                this.props.login(value);
            }
            return value;
        })
    }
    componentWillMount(){
        this.getKey();
    }
    render() {
        return (
            <View style={{ width: width, height: height, backgroundColor: '#fff' }}>
                <SearchInput
                    navigation={this.props.navigation}
                />
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={{
                        backgroundColor: '#fff',
                        height: 2
                    }}
                    tabBarBackgroundColor='#1e88f5'
                    tabBarActiveTextColor='#fff'
                    tabBarInactiveTextColor='#fff'
                    tabBarTextStyle={{ fontSize: 18 }}
                    locked={false}
                >
                    <View tabLabel='查排名' style={{ marginBottom: 50 }}>
                        <RanList navigation={this.props.navigation} />
                    </View>
                    <View tabLabel='查权重' style={{ marginBottom: 50 }}>
                        <WeiList navigation={this.props.navigation} />
                    </View>
                    <View tabLabel='查销量' style={{ marginBottom: 50 }}>
                        <SalList navigation={this.props.navigation} />
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