import {StyleSheet,Dimensions} from 'react-native';

const {width,height} = Dimensions.get('window');

const good_css = StyleSheet.create({
    img_wrap:{
        flex: 0
    },
    SkuList: {
        width:width,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        padding:5,
        borderBottomColor: '#EFEFEF',
    },
    good_img:{
        width: 130,
        height: 130
    },
    good_detail:{
        height: 130,
        width:width-130-10,//宽度-图片宽度-sku的padding
        paddingLeft:10,
        paddingRight:5,
        alignItems: 'flex-start',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    good_top:{
        flexDirection:'column',
    },
    good_bottom:{
        flexDirection:'column',
    },
    lastList: {
        borderBottomWidth: 0
    },
    title: {
        fontSize: 14,
        color:'#4A4A4A'
    },
    right:{
        flex:0,
        paddingLeft:10,
        flexDirection:'row',
        color:'#4a4a4a',
        fontSize:12
    },
    left:{
        width:80,
        flexDirection:'row',
        color:'#4a4a4a',
        fontSize:12
    },
    left1:{
        color:'#4a4a4a',
        fontSize:12
    },
    smallFont:{
        color:'#4a4a4a',
        fontSize:12
    },
    itemWrap: {
        flexDirection: 'row',
        marginTop: 4,
    },
    itemWrap3:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop: 4,
        width:width-130-10-10-5//宽度-图片宽度-sku的padding-detail的padding
    },
    itemWrap4:{
        flexDirection:'row',
        alignItems:'center',
        marginTop: 4,
        width:width-130-10-10-5//宽度-图片宽度-sku的padding-detail的padding
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
    radio:{
        width:20,
        height:20,
        margin:10
    }
});

export default good_css;