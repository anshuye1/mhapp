import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import good_css from '../css/good_css';

export default class SalItem extends Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        item:{},
        data:[]
    };
    render(){
        const {item} = this.props;
        let result = item?item:{};
        let result_json = item&&item.result_json?item.result_json:{};
        return (
            <View
                style={good_css.SkuList}
            >
                <View style={good_css.img_wrap}>
                    <Image source={{
                        uri: result_json.img
                    }} style={good_css.good_img} />
                </View>
                <View style={good_css.good_detail}>

                    <View style={good_css.good_top}>
                        <Text style={good_css.title} numberOfLines={1}>{result_json.title}</Text>
                        <View style={good_css.itemWrap}>
                            <Text style={[good_css.smallFont,{color:'#9B9B9B',textAlign:'right',flex:1,lineHeight:25}]}>{result.create_at}</Text>
                        </View>
                    </View>

                    <View style={good_css.good_bottom}>
                        <View style={good_css.itemWrap}>
                            <Text numberOfLines={1} style={good_css.smallFont}>{result_json.specification}</Text>
                        </View>

                        <View style={good_css.itemWrap}>
                            <Text numberOfLines={1} style={good_css.smallFont}>sku:{result_json.sku}</Text>
                        </View>

                        <View style={good_css.itemWrap4}>
                            <Text numberOfLines={1} style={[good_css.smallFont,{flex:1}]}>
                                <Text style={[good_css.smallFont,{color:'#1e88f5'}]}>15天</Text>
                                销量：
                                <Text style={[good_css.smallFont,{color:'#FF314B'}]}>{result_json.data&&result_json.data[2]?result_json.data[2].totalUV:'--'}</Text>
                            </Text>
                            <Text numberOfLines={1} style={[good_css.smallFont,{flex:1}]}>
                                <Text style={[good_css.smallFont,{color:'#1e88f5'}]}>30天</Text>
                                销量：
                                <Text style={[good_css.smallFont,{color:'#FF314B'}]}>{result_json.data&&result_json.data[3]?result_json.data[3].totalUV:'--'}</Text>
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}