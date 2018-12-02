import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';

import good_css from "../css/good_css";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MenuRan extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    render(){

        const {type,closeMenu,navigate} = this.props;

        return (
            <TouchableOpacity style={good_css.mask1} onPress={closeMenu}>
                <View style={good_css.mask1_wrap}>
                    <Icon style={good_css.mask1_icon} name="sort-up"/>
                    <TouchableOpacity
                        style={good_css.mask1_btn}
                        onPress={()=>{
                            closeMenu();
                            if(type!=1){
                                navigate('Ranking',{item:{}})
                            }
                        }}
                    >
                        <Image source={require('../img/xxi14.png')} style={good_css.mask1_img}/>
                        <Text style={good_css.mask1_text}>查排名</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={good_css.mask1_btn}
                        onPress={()=>{
                            closeMenu();
                            if(type!=2){
                                navigate('Weight',{item:{}})
                            }
                        }}
                    >
                        <Image source={require('../img/xxi11.png')} style={good_css.mask1_img}/>
                        <Text style={good_css.mask1_text}>查权重</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={good_css.mask1_btn}
                        onPress={()=>{
                            closeMenu();
                            if(type!=3){
                                navigate('Sales',{item:{}})
                            }
                        }}
                    >
                        <Image source={require('../img/xxi15.png')} style={good_css.mask1_img}/>
                        <Text style={good_css.mask1_text}>查销量</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        )
    }
}
