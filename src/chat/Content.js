import React, { Component } from 'react';
import { Text, View,ScrollView,Image,TouchableOpacity } from 'react-native';
import Ajax from "../common/Ajax";
import Loading from "../common/Loading";
import MineHea from "../mine/MineHea";
import common_css from "../css/common_css";
import mine_css from "../css/mine_css";

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
            <View style={common_css.container}>
                <MineHea goBack={goBack} title={'消息'}/>

                <ScrollView>
                    {ready?
                        <View style={mine_css.mesContentWrap}>
                            <Text style={mine_css.mesTitle}>{data.title}</Text>
                            <Text style={mine_css.mesTime}>{data.create_at}</Text>
                            <Text style={mine_css.mesContent}>{data.content}</Text>
                        </View>
                        :null
                    }
                </ScrollView>

                {ready?null:<Loading />}
            </View>
        );
    }
}
