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
    }
});

export default common_css;