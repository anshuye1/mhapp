import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {
    Easing,
    Animated
} from 'react-native'

import Icon from "react-native-vector-icons/Ionicons"

import SkuList from './components/SkuList';
import Ranking from './components/Ranking';
import Weight from './components/Weight';
import Sales from './components/Sales';
import RanHistory from './page/RanHistory';

import Chat from './components/Chat';
import Search from './components/Search';

import Login from './common/Login';
import Signup from './common/Signup';
import Forget from './common/Forget';
import Mine from './components/Mine';
import Vip from "./mine/Vip";
import Product from "./mine/Product";
import Suggest from "./mine/Suggest";
import Setting from "./mine/Setting";
import Version from "./mine/Version";
import Customer_service from "./mine/Customer_service";

const BottomTab = createBottomTabNavigator({
    SkuList: {
        screen: SkuList,
        navigationOptions: {
            tabBarLabel: '我的sku',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-filing" size={20} color={tintColor} />
            ),
        },
    },
    Chat: {
        screen: Chat,
        navigationOptions: {
            tabBarLabel: '消息',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-chatboxes" size={20} color={tintColor} />
            ),
        },
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-person" size={20} color={tintColor} />
            ),
        },
    }
}, {
    tabBarOptions: {
        activeTintColor: '#1e88f5',
        inactiveTintColor: '#B4C3CC',
        labelStyle: {
            fontSize: 12,
            marginBottom: 5,
        },
        style: {
            borderTopWidth: 1,
            borderTopColor: '#c3c3c3',
            height: 50,
            backgroundColor: '#fff'
        },
    }

});

const MyApp = createStackNavigator({
    Home: {
        screen: BottomTab,
        navigationOptions: {
            header: null
        }
    },
    Ranking,
    Weight,
    Sales,
    Search,
    Login,
    Signup,
    Forget,
    RanHistory,
    Vip,
    Product,
    Customer_service,
    Version,
    Setting,
    Suggest
}, {
    headerMode: 'screen',
    // headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
        gesturesEnabled: false,
    },
    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const width = layout.initWidth;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });

            return { opacity, transform: [{ translateX }] };
        },
    }),
});
export default MyApp
