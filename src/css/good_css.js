import {StyleSheet,Dimensions} from 'react-native';

const {width,height} = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [300, 214];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];

const good_css = StyleSheet.create({
    wrapper:{
        position: 'absolute',
        top:0,
        left:0,
        zIndex: 1,
        backgroundColor:'rgba(0,0,0,0.3)',
        width:width,
        height:height
    },
    tabBar:{
        backgroundColor: '#f5f5f5',
        height: 3
    },
    tab:{
        height:45
    },
    tabFont:{
        fontSize: 16,paddingTop:5
    },
    tabItem:{
        flex:1,
    },
    ViewLoginOut:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:height-180
    },
    outImg:{
        width:105,height:75
    },
    outText:{
        fontSize:14,
        flexWrap:'nowrap',
        width:width*0.8,
        marginTop:20,
        color:'#BDBDBD'
    },
    blueText:{
        color:'#1e88f5'
    },
    img_wrap:{
        flex: 0
    },
    SkuList: {
        width:width,
        flexDirection: 'row',
        alignItems: 'center',
        padding:5,
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
    itemWrap1: {
        flexDirection: 'row',
        marginTop: 4,
        justifyContent:'space-between'
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
    heaTabItemBtn:{
        height:40,
        lineHeight:40,
        textAlign:'center',
        color:'#4A4A4A'
    },
    tabIcon:{
        width:8,height:8
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
        bottom:0,
        zIndex:9,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:30,
    },
    bottomHisFix:{
        backgroundColor:"#fff",
        position:"absolute",
        width:width,
        height:50,
        left:0,
        bottom:0,
        zIndex:9,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:30,
    },
    //删除
    goodsRow:{
        flexDirection:'row',
        alignItems:'center'
    },
    font16:{
        fontSize:16
    },
    delBtn:{
        fontSize:16,
        width:80,
        height:40,
        lineHeight:40,
        borderColor:'#999',
        borderWidth:1,
        color:'#999',
        borderRadius:8,
        textAlign:'center'
    },
    delBtn1:{
        fontSize:16,
        width:80,
        height:40,
        lineHeight:40,
        backgroundColor:'#FF3851',
        color:'#fff',
        borderRadius:8,
        textAlign:'center',
        marginLeft:15
    },

    content:{
        flex:1
    },
    radio:{
        width:20,
        height:20,
        margin:10
    },
    //查询样式
    container:{
        flex:1,
        backgroundColor:'#F0F3F5'
    },
    header:{
        width:width,
        height:50,
        backgroundColor:'#1388f5',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    header_wrap:{
        flex:2,
    },
    header_text:{
        color:'#fff',
        fontSize:20,
        fontWeight:'600',
        textAlign:'center'
    },
    headerBottom:{
        backgroundColor:'#1e88f5',
        width:width,
        paddingLeft:50,
        paddingRight:50,
        paddingTop:10,
        padding:20
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 4,
    },
    input:{
        flex:1,
        fontSize:14,
        height: 35,
        padding:0,
        lineHeight: 35,
        color:'#666'
    },
    searchIcon: {
        paddingLeft: 10,
        paddingRight: 10,
        color:'#B0B0B0'
    },
    filterFont:{
        fontSize:14,
        color:'#fff',
        marginRight:15
    },
    filterFont1:{
        color:'#F8E71C'
    },
    wrap:{
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
    },
    mask: {
        justifyContent:"center",
        backgroundColor:"#000",
        opacity:0.3,
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
    },
    mask1: {
        justifyContent:"flex-end",
        flexDirection:'row',
        backgroundColor:"rgba(0,0,0,0.3)",
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
    },
    mask1_wrap:{
        backgroundColor:'#fff',
        borderRadius:4,
        width:125,
        height:144,
        marginRight:20,
        marginTop:50,
        justifyContent:'space-around',
    },
    mask1_icon:{
        position:'absolute',
        right:3,
        top:-12,
        borderBottomWidth:1,
        borderBottomColor:'#fff',
        fontSize:30,
        color:'#fff'
    },
    mask1_btn:{
        flexDirection:'row',
        padding:10,
        alignItems:'center',
    },
    mask1_img:{
        width:18,
        height:18,
        marginRight: 10,
        marginLeft: 10
    },
    mask1_text:{
        fontSize:16,
    },
    tip:{
        flex:1,
        backgroundColor:'#fff',
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        padding:15,
    },
    history_btn_wrap:{
        marginRight:-50,marginLeft:10
    },
    history_btn:{
        color:'#fff',fontSize:14,textAlign:'center',lineHeight:35,height:35
    },
    query_btn:{
        backgroundColor:'#fff',width:100,borderRadius:4
    },
    query_btn_text:{
        color:'#1e88f5',fontSize:14,textAlign:'center',lineHeight:35,height:35,
    },
    ran_hea:{
        flexDirection:'row',
        height:36,
        marginBottom:4,
        backgroundColor:'#fff',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10,
    },
    ran_hea_left:{
        lineHeight:36,
        color:'#4a4a4a',
        fontSize:15
    },
    ran_hea_right:{
        lineHeight:36,
        color:'#999',
        fontSize:12
    },
    foo_bom_wrap:{
        flexDirection:'row',
        justifyContent:'center',
        height:40,
        alignItems:'center',
        marginTop:10,
        marginBottom:15,
    },
    foo_bom_btn:{
        width:80,
        height:36,
        lineHeight:36,
        textAlign:'center',
        backgroundColor:'#1e88f5',
        color:'#fff',
        borderRadius:4,
        marginRight:35,
    },
    foo_bom_btn1:{
        marginRight:0,
    },
    other_sku:{
        lineHeight:30,
        color:'#4a4a4a',
        paddingLeft:10,
        paddingRight:10,
    },
    foo_top_wrap:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
    },
    msg_text:{
        color:'#FE344E',
        textAlign:'center',
        lineHeight:30,
        fontSize:12
    },
    msg_btn:{
        width:80,
        height:36,
        lineHeight:36,
        textAlign:'center',
        backgroundColor:'#FE344E',
        color:'#fff',
        borderRadius:4,
    },
    footer_view:{
        backgroundColor:'#fff',
        marginBottom:1
    },
    item_ran_wrap:{
        backgroundColor:'#fff',
        marginBottom:1,
        flexDirection:'column'
    },
    sal_tr:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between'
    },
    sal_td:{
        flex:1,
        textAlign:'center',
        color:'#4a4a4a',
        lineHeight:20
    },
    sal_th:{
        flex:1,
        textAlign:'center',
        color:'#1e88f5',
        lineHeight:20
    },
    sal_table:{
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:10,
        backgroundColor:'#fff',
        marginBottom:1
    },
    sal_title:{
        lineHeight:30,
        color:'#4a4a4a',
    }
});

export default good_css;