import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import good_css from '../css/good_css';

export default class RanItem extends Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        item:{},
        data:[]
    };
    render(){
        const {item} = this.props;
        let result = item&&item.result&&item.result[0]?item.result[0]:{};
        let entranceObj = {1:'pc',2:'app',3:'微信'};//1表示电脑端 2表示移动端 3微信
        return (
            <View
                style={good_css.SkuList}
            >
                <View style={good_css.img_wrap}>
                    <Image source={{
                        uri: result.good_img_url
                    }} style={good_css.good_img} />
                </View>
                <View style={good_css.good_detail}>
                    <View style={good_css.good_top}>
                        <Text style={good_css.title} numberOfLines={1}>{result.good_title}</Text>
                        <View style={good_css.itemWrap}>
                            <Text style={[good_css.left,{fontSize:16,color:'#FF314B'}]}>￥ {result.price}</Text>
                            <Text style={[good_css.smallFont,{color:'#9B9B9B',textAlign:'right',flex:1,lineHeight:25}]}>{result.create_at}</Text>
                        </View>
                        <View style={good_css.itemWrap}>
                            <View style={good_css.left}>
                                <Text style={[good_css.smallFont,{color:'#1e88f5',backgroundColor:'#EAF4FF',flex:0}]} numberOfLines={1}>{entranceObj[result.client_type]}{result.cityName}</Text>
                                <Text></Text>
                            </View>
                            <Text style={good_css.right} numberOfLines={1}>{result.specification}</Text>
                        </View>
                    </View>

                    <View style={good_css.good_bottom}>
                        <View style={good_css.itemWrap}>
                            <Text style={good_css.left} numberOfLines={1}>
                                {result.keyword}
                            </Text>
                            <Text style={good_css.right} numberOfLines={1}>sku:{result.sku}</Text>
                        </View>

                        <View style={good_css.itemWrap}>
                            <Text style={good_css.left} numberOfLines={1}>
                                第{result.page}页-{result.page_position}个
                            </Text>
                            <Text style={good_css.right} numberOfLines={1}>排名：<Text style={{color:'#FF314B'}}>{result.page_order}</Text></Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}