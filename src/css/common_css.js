import {StyleSheet,Dimensions} from 'react-native';

const {width,height} = Dimensions.get('window');


const common_css = StyleSheet.create({
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
    heaLeft:{
        flex:1,
        alignItems:'flex-start',
    },
    heaLeftImg:{
        width:20,
        height:20,
        marginLeft:10
    },
    heaContent:{
        flex:2,
    },
    headerText:{
        color:'#fff',
        fontSize:18,
        fontWeight:'600',
        textAlign:'center'
    },
    heaRight:{
        flex:1
    },
    inputBox:{
        flexDirection: 'row',
        alignItems:'center',
        width: width*0.9,
        height: 45,
        borderWidth: 1,
        marginBottom:15,
        borderRadius:8,
        fontSize:16,
        paddingLeft:10,
        borderColor:'#DBDBDB'
    },
    msgBottom: {
        flex: 1
    },
    msgBottomItem:{
        height:62,
        width:width,
        borderBottomColor:'#F0F3F5',
        borderBottomWidth:1,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingLeft:15,
    },
    msgIconImg:{
        width:20,
        height:18,
        marginRight:16
    },
    msgItem:{
        fontSize:14,
        color:'#4A4A4A',
    },
    msgHeaImg:{
        width:25,
        height:25,
        marginLeft: 8,
    },
    userWrap:{
        marginBottom:10,
        flexDirection:'row',
        flex:1,
        alignItems:'flex-end',
    },
    userName:{
        fontSize: 18,
        color: '#4a4a4a',
        lineHeight:20
    },
    userCode:{
        fontSize: 14,
        color: '#fff',
        backgroundColor:'#1e88f5',
        textAlign:'center',
        paddingLeft:3,
        paddingRight:3,
        marginLeft:10,
        borderRadius:4,
        height:20
    },
    userRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
        paddingRight: 10,
        paddingTop:5
    }
});

export default common_css;