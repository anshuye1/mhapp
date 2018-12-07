import React, { Component } from 'react';
import { Text, View,ScrollView,Image,Dimensions,TouchableOpacity,StyleSheet } from 'react-native';
import Ajax from "../common/Ajax";
import Loading from "../common/Loading";

const {width,height} = Dimensions.get('window');

export default class Content extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props){
        super(props);
        this.state = {
            data:{},
            ready:false,
        }
    }

    mesDetailAjax(){
        const {state:{params:{id}}} = this.props.navigation;
        Ajax.post('/user/my-message-in',{id:id})
            .then((response)=>{
                console.log(response);
                if(response.result==1){
                    this.setState({
                        data:response.data,
                        ready:true
                    });
                }else{
                    if(response.msg){
                        alert(response.msg)
                    }else{
                        alert('系统错误')
                    }
                    this.setState({
                        ready:true
                    });
                }
            })
            .catch((error)=>{
                this.setState({
                    ready:true
                });
                alert('系统错误')
            })
    }

    componentDidMount(){
        this.mesDetailAjax();
    }

    render() {
        const {goBack} = this.props.navigation;
        const {ready,data} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:1}} onPress={()=>goBack()}>
                        <Image source={require('../img/fhui1.png')} style={{width:20,height:20,marginLeft:5}}/>
                    </TouchableOpacity>
                    <View style={styles.header_wrap}>
                        <Text style={styles.header_text}>消息</Text>
                    </View>
                    <Text style={{flex:1}}></Text>
                </View>

                <ScrollView>
                    {ready?
                        <View style={{backgroundColor:'#fff',width:width-32,margin:16,padding:20,borderRadius:8,}}>
                            <Text style={{fontSize:16,textAlign: 'center',color:'#4a4a4a',lineHeight:30}}>{data.title}</Text>
                            <Text style={{fontSize:12,textAlign:'right',color:'#ccc',lineHeight:30}}>{data.create_at}</Text>
                            <Text style={{textAlign:'left',color:'#4a4a4a',lineHeight:20,marginBottom: 100}}>{data.content}</Text>
                        </View>
                        :null
                    }
                </ScrollView>

                {ready?null:<Loading />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F3F5'
    },
    header:{
        width:width,
        height:50,
        backgroundColor:'#288EF7',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    header_wrap:{
        flex:2,paddingRight:25
    },
    header_text:{
        color:'#fff',fontSize:18,fontWeight:'600',textAlign:'center'
    },

    red:{
        color:'#FF4359'
    },
    blue:{
        color:'#288EF7'
    },
    fontWrap:{
        fontSize:15,
        color:'#4A4A4A',
        flexDirection:'row',
        lineHeight:25,
        fontWeight:'600'
    },
    fontWrap1:{
        fontSize:16,
        color:'#4A4A4A',
        flexDirection:'row',
        lineHeight:25
    }
});
