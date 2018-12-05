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
    },
    //客服
    contentWrap:{
        flex:1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'flex-start'
    },
    contentTop:{
        width:width*0.9,
        marginTop:15,
        borderRadius:8,
        backgroundColor:'#fff',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    kf_wx:{
        width:200,
        height:200,
        margin: 5
    },
    kf_text:{
        textAlign: 'left',
        width:width*0.9,
        marginTop: 10,
        marginLeft:20,
        color:'#4a4a4a'
    },
    kf_bottom:{
        marginBottom: 20,
        fontSize:16,
        color:'#4a4a4a'
    },
    contentBottom:{
        width:width*0.9,
        marginTop:15,
        borderRadius:8,
        backgroundColor:'#fff',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    kf_item:{
        width:width*0.9,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    kf_btn:{
        width:80,
        height:36,
        lineHeight:36,
        backgroundColor:'#1e88f5',
        color:'#fff',
        textAlign:'center',
        borderRadius:4,
        marginTop:15,
        marginBottom:15
    },
    kf_font:{
        fontSize:16,
        color:'#4a4a4a'
    },
    rowWrap:{
        flexDirection:'row',
        alignItems:'center',
    },
    smallFont:{
        fontSize:12,
        color:'#9B9B9B',
    },
    rightIcon:{
        width:17,
        height:22,
        marginRight: 15,
        marginLeft:5
    },
    //wode
    meTop: {
        width:width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F3F5',
        height:100,
        marginBottom:50,
        justifyContent:'space-around'
    },
    meTopWrap:{
        backgroundColor:'#fff',
        justifyContent:'flex-start',
        flexDirection:'row',
        width:width*0.9,
        borderRadius:8,
        height:115,
        marginTop:64,
        alignItems:'center'
    },
    meTopImg: {
        width: 73,
        height: 73,
        borderRadius: 40,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: 15,
        overflow: 'hidden'
    },
    meImg:{
        width:73,
        height:73
    },
    meBottom: {
        flex: 2
    },
    meBottomItem:{
        height:52,
        width:width,
        borderBottomColor:'#F0F3F5',
        borderBottomWidth:1,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
    },
    meIconImg:{
        width:20,
        height:18,
        marginRight:16
    },
    meItem:{
        fontSize:16,
        color:'#4A4A4A',
    },
    meText1:{
        fontSize: 18,
        color: '#9B9B9B'
    },
    meText2:{
        fontSize:12,
        color:'#9B9B9B',
        marginTop:3
    }
});

export default mine_css;