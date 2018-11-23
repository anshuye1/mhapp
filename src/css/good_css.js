import {StyleSheet,Dimensions} from 'react-native';

const {width,height} = Dimensions.get('window');

const good_css = StyleSheet.create({
    img_wrap:{
        flex: 0
    },
    good_img:{
        width: 130,
        height: 130
    },
    good_detail:{
        height: 130,
        flex: 2,
        paddingLeft:14,
        alignItems: 'flex-start',
    },
    SkuList: {
        width:width,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },
    lastList: {
        borderBottomWidth: 0
    },
    title: {
        fontSize: 16,
        color:'#4A4A4A'
    },
    right:{
        flex:1,
        paddingLeft:20,
        flexDirection:'row',
        color:'#555'
    },
    left:{
        width:100,
        color:'#555'
    },
    itemWrap: {
        display:'flex',
        flexDirection: 'row',
        marginTop: 4,
    },
    itemWrap3:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:width-150-14
    },
    itemWrap1: {
        marginTop:10
    },
    loadding:{
        marginTop:150
    },
    //端口等
    heaTab:{
        flexDirection:'row',
        width:width,
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap',
    },
    heaTabItem:{
        flex:1,
        height:40,
        lineHeight:40,
        textAlign:'center',
        color:'#4A4A4A',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    active:{
        color:'#1e88f5'
    },
    entranceWrap:{
        position:'absolute',
        top:40,
        left:0,
        backgroundColor:'#fff',
        width:width,
        zIndex:10
    },
    entrance:{
        height:30,
        paddingLeft:40,
        paddingRight:40,
        backgroundColor:'#fff',
        position:'relative'
    },
    entranceFont:{
        color:'#4A4A4A',
        lineHeight:30
    },
    dhImg:{
        position:'absolute',
        right:40,
        top:5,
    },
    wrapFix:{
        justifyContent:"center",
        backgroundColor:"#000",
        opacity:0.3,
        position:"absolute",
        width:width,
        height:height,
        left:0,
        top:40,
        zIndex:9
    },
    bottomFix:{
        backgroundColor:"#fff",
        position:"absolute",
        width:width,
        height:50,
        left:0,
        top:height-150-85,
        zIndex:9,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:30,
    },
    content:{
        paddingBottom: 50,
        marginBottom:30,
    },
    left1:{}
});

export default good_css;