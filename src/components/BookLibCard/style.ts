import { Dimensions, StyleSheet } from 'react-native';
import { greenRarity, pink, purple, white } from '../../constants/colors';

let {width} = Dimensions.get('window');

export const stylesBookLibCard = StyleSheet.create({
    container_lib_book:{
        paddingLeft:13,
        paddingRight:12,
        paddingBottom:17,
        marginBottom:15,
        borderBottomWidth: 1,
        borderColor:'#ACACAC',
        flexDirection:'row',
        backgroundColor:white,
        width:width,

    },
    cover_book:{
        width:85,
        height:135,
        overflow: 'hidden',
        borderRadius:8,
    },
    empty_cover_book:{
        width:85,
        height:135,
        overflow: 'hidden',
        borderRadius:8,
        backgroundColor:pink,
        paddingTop:10,
        paddingLeft:5,
        paddingRight:5
    },
    text_empty_cover_book:{
        fontFamily:'MontserratAlt500',
        fontSize:14,
        color:'white',
        textAlign:'center',
        
    },
    container_info_book:{
        flex:1,
        marginLeft:39,
        marginTop:10,
    },
    title:{
        fontFamily:'Montserrat700',
        fontSize:16,

    },
    author:{
        fontFamily:'Montserrat700',
        fontSize:14,
        color:'#9E9E9E',
        marginTop:8,
    },
    progress_bar:{
        // transform: [{scaleY: 1}], 
        borderRadius:8, 
        marginTop:10,
    },
    text_progress:{
        fontSize:15,
        fontFamily:'Montserrat300',
    },
    btn_read:{
        width:99,
        height:22,
        backgroundColor:purple,
        overflow:'hidden',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        alignSelf:'flex-end',
        marginRight:22,
    },
    

});