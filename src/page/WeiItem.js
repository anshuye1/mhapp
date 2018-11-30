import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import good_css from '../css/good_css';

export default class WeiItem extends Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        item:{},
        data:[]
    };
    render(){
        const {item,item1,sku_self,dataHis} = this.props;
        let result = item&&item.result&&item.result[0]?item.result[0]:{};
        result = item1?item1:result;
        result = dataHis?dataHis:result;
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
                        <View style={good_css.itemWrap1}>
                            <Text style={{fontSize:16,color:'#FF314B',width:100}}>￥ {result.price}</Text>
                            {sku_self?
                                <TouchableOpacity onPress={this.props.goSelf}>
                                    <Text style={[good_css.smallFont,{color:'#1e88f5',textAlign:'center',lineHeight:25,width:48,height:25,backgroundColor:'#EAF4FF',borderRadius:4}]}>查看</Text>
                                </TouchableOpacity>
                                :
                                <Text style={[good_css.smallFont,{color:'#9B9B9B',textAlign:'right',lineHeight:25}]} onPress={()=>{
                                    if(sku_self){
                                        this.props.goSelf()
                                    }
                                }}>{result.create_at}</Text>
                            }
                        </View>
                        <View style={good_css.itemWrap}>
                            <Text numberOfLines={1} style={good_css.smallFont}>{result.specification}</Text>
                        </View>
                    </View>


                    <View style={good_css.good_bottom}>
                        <View style={good_css.itemWrap}>
                            <Text style={good_css.left} numberOfLines={1}>
                                {result.keyword}
                            </Text>
                            <Text style={good_css.right} numberOfLines={1}>sku:{result.sku}</Text>
                        </View>

                        <View style={good_css.itemWrap3}>
                            <View>
                                <Text style={good_css.left1} numberOfLines={1}>
                                    标题：<Text style={good_css.smallFont}>{result.title_weight}</Text>
                                </Text>
                            </View>
                            <View>
                                <Text style={good_css.left1} numberOfLines={1}>
                                    权重：<Text style={[good_css.smallFont,{color:'#FF314B'}]}>{result.weight}</Text>
                                </Text>
                            </View>
                            <View>
                                <Text style={good_css.left1} numberOfLines={1}>
                                    排名：<Text style={[good_css.smallFont,{color:'#FF314B'}]}>{result.page_order}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>


                </View>
            </View>
        )
    }
}