import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    AsyncStorage,
    Text
} from 'react-native'
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');//获取手机的宽和高

const styles =StyleSheet.create( {
    wrapper: {

    },
    container: {
        flex: 1,//必写
        backgroundColor:'#fff'
    },
    image: {
        width,//等于width:width
        height,
    }
});

export default class Welcome extends Component {
    constructor(){
        super();
        this.state = {
            ready:false
        }
    }

    openApp(){
        AsyncStorage.getItem('isFirst',(error,result)=>{

            if (result == 'false') {
                console.log('不是第一次打开');

                this.props.navigation.navigate('SkuList');

            } else  {

                console.log('第一次打开');

                this.setState({
                    ready:true
                })

                // 存储
                AsyncStorage.setItem('isFirst','false',(error)=>{
                    if (error) {
                        alert(error);
                    }
                });

                this.timer=setTimeout(()=>{
                    this.props.navigation.navigate('SkuList');//7秒后进入底部导航主页
                },4500)
            }
        });
    }

    //加载计时器
    componentDidMount(){
        this.openApp();
    }
    //卸载计时器
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);//同时为真的才执行卸载
    }
    render () {
        const {ready} = this.state;

        return (
            <View style={styles.container}>
                {ready?
                    <Swiper style={styles.wrapper}
                            showsButtons={false}       //为false时不显示控制按钮
                            paginationStyle={{      //小圆点位置
                                bottom: 0
                            }}
                            loop={false}        //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                            autoplay={true}          //自动轮播
                            autoplayTimeout={1.5}      //每隔2秒切换
                    >

                        <Image style={styles.image} source={require('../img/ydye1.png')}/>
                        <Image style={styles.image} source={require('../img/ydye2.png')}/>
                        <Image style={styles.image} source={require('../img/ydye3.png')}/>

                    </Swiper>
                    :
                    <View style={{flex:1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor: '#1e88f3'}}>
                        <Image source={require('../img/logo11.png')} />
                        <Text style={{fontSize:20,color:'#fff',lineHeight:40,marginTop:10}}>欢迎来的JD魔盒</Text>
                    </View>
                }
            </View>
        )
    }
}