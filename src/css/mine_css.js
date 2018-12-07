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
        height:120,
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
    meIcon:{
        marginRight:16,
        fontSize:16,
        color:'#ccc',
        marginLeft:10
    },
    modifyImgIcon:{
        width:17,
        height:22,
        marginRight:16,
        marginLeft:10
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
    },
    //suggest
    suFontHea:{
        marginBottom:10,
        fontSize:16,
        color:'#4A4A4A'
    },
    suInput:{
        height:220,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#ddd',
        fontSize:16,
        color:'#4A4A4A',
        padding:10,
        lineHeight:25,
        textAlignVertical: 'top',
        marginBottom:15,
        borderRadius:8
    },
    suInput1:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#ddd',
        fontSize:16,
        color:'#4A4A4A',
        padding:10,
        lineHeight:30,
        marginBottom:15,
        borderRadius:8
    },
    suBtn:{
        lineHeight:60,
        textAlign:'center',
        color:'#fff',
        fontSize:18,
        backgroundColor:'#1e88f5',
        borderRadius:8,
        marginTop:10
    },
    //vip
    vipWrap:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    vipGroup:{
        width:285,
        height:45,
        margin:20,
        borderRadius:8,
        backgroundColor:'#EAF4FF',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    vipBtn:{
        flex:1,
        textAlign:'center',
        lineHeight:45,
        fontSize:18
    },
    vipBtn1:{
        backgroundColor:'#1e88f5',
        borderRadius:8,
        color:'#fff',
    },
    heaTitle:{
        marginBottom:10,
        color:'#4a4a4a'
    },
    shareBg:{
        width:200,
        height:231,
        marginTop:10,
        marginBottom:10
    },
    shareNum:{
      marginTop:30,
      marginBottom:30
    },
    shareBtn:{
        width:100,
        height:36,
        backgroundColor:'#1e88f5',
        color:'#fff',
        lineHeight:36,
        textAlign:'center',
        borderRadius:4
    },
    vipItem:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:width,
        padding:10,
    },
    vipOption:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        width:width-90,
        color:'#4a4a4a',
        lineHeight:25,
    },
    vipName:{
        width:70,
        lineHeight:25,
        textAlign:'right'
    },
    vipItemBtn:{
        width:70,
        height:29,
        lineHeight:29,
        textAlign:'center',
        color:'#4a4a4a',
        borderWidth:1,
        borderColor:'#C7C7C7',
        borderRadius:4,
    },
    vipDisabled:{
        color:'#C7C7C7'
    },
    vipActive:{
        color:'#fff',
        backgroundColor:'#1e88f5',
        borderColor:'#1e88f5',
    },
    vipItemBtn1:{
        width:60,
        height:29,
        lineHeight:29,
        textAlign:'center',
        color:'#4a4a4a',
        borderWidth:1,
        borderColor:'#C7C7C7',
        borderRadius:4,
    },
    vipSmallImg:{
        width:18,
        height:18,
    },
    vipSubmit:{
        backgroundColor:'#1e88f5',
        width:100,
        height:36,
        lineHeight:36,
        color:'#fff',
        textAlign:'center',
        borderRadius:4,
        marginTop:15
    }
});

export default mine_css;