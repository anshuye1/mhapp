import {StyleSheet,Dimensions} from 'react-native';

const {width,height} = Dimensions.get('window');


const mine_css = StyleSheet.create({
    modifyWrap:{
        flex:1,
        flexDirection: 'column',
    },
    modifyInner:{
        flex:1,
        justifyContent: 'space-between',
        backgroundColor: '#F0F3F5'
    },
    modifyBtn:{
        width:width,
        height:52,
        backgroundColor:'#fff',
        lineHeight:52,
        paddingLeft: 20,
        paddingRight: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modifyText:{
        color:'#4a4a4a',
        fontSize:14
    },
    modifyImg:{
        width:17,
        height:22
    },
    outWrap:{
        width:width,
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:50
    },
    outBtn:{
        width:width*0.9,
        height:52,
        lineHeight: 52,
        backgroundColor:'#1e88f5',
        color:'#fff',
        textAlign: 'center',
        borderRadius:8,
        fontSize: 16
    }
});

export default mine_css;