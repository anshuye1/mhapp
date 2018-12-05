import {StyleSheet,Dimensions} from 'react-native';
import good_css from "./good_css";

const {width,height} = Dimensions.get('window');


const login_css = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    loginInput: {
        width: width*0.9,
        height: 45,
        borderWidth: 1,
        marginBottom:15,
        borderRadius:8,
        fontSize:16,
        paddingLeft:10
    },
    middleBottom: {
        marginTop:10,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    textColor:{
        color:'#9B9B9B'
    },
    top: {
        width:width,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        height:202,
        marginBottom:40,
        justifyContent:'flex-start'
    },
    btnWrap:{
        width: width*0.9,
        backgroundColor:'#1e88f5',
        borderRadius:8
    },
    btn:{
        color:'#fff',
        fontSize:18,
        lineHeight:45,
        textAlign:'center'
    },
    iconWrap:{
        width:width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10
    },
    inputWrap:{
        width:width,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    timeBtn:{
        backgroundColor:'#1e88f5',
        color:'#fff',
        lineHeight:45,
        height:45,
        width:140,
        textAlign:'center',
        borderRadius:8,
        fontSize:16,
    },
    timeBtn1:{
        backgroundColor:'#1e88f5',
        color:'#fff',
        lineHeight:45,
        height:45,
        width:140,
        textAlign:'center',
        borderRadius:8,
        fontSize:16,
        opacity:0.6
    },
    hea:{
        width:width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        backgroundColor:'#1e88f5',
        marginBottom:40,
        height:50,
        alignItems:'center'
    },
    backImg:{
        width:22,
        height:22,
        marginTop:15
    }
});

export default login_css;