import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import common_css from '../css/common_css';

export default class MineHea extends Component {
    constructor(){
        super();
    }
    render () {
        return (
            <View style={common_css.header}>
                <TouchableOpacity style={common_css.heaLeft} onPress={()=>this.props.goBack()}>
                    <Image source={require('../img/fhui1.png')} style={common_css.heaLeftImg}/>
                </TouchableOpacity>
                <View style={common_css.heaContent}>
                    <Text style={common_css.headerText}>{this.props.title}</Text>
                </View>
                <Text style={common_css.heaRight}></Text>
            </View>
        )
    }
}