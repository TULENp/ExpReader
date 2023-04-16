import { Dimensions, StyleSheet } from "react-native";
import { purple, themeYellow } from "../../constants/colors";

const {height, width} =  Dimensions.get('window')

export const stylesReader = StyleSheet.create({
    container_upper_modal:{
        height:65,
        width:'100%',
        backgroundColor:purple,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

        paddingLeft:30,
        paddingRight:30,
        // paddingBottom:16,
        // paddingTop:16,
    },
    container_lower_modal:{
        height:270,
        width:'100%',
        backgroundColor:purple,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        alignItems:'center',
        // justifyContent:'center',

    },
    title:{
        fontFamily:'Montserrat700',
        color:'white',
        fontSize:16,

    },
    text_pages_medium:{
        fontFamily:'Montserrat500',
        color:'white',
        fontSize:16,
        marginTop:25,
    },
    text_pages_bold:{
        fontFamily:'Montserrat700',
    },
    wrapper_settings:{
        width:'100%',
        
    },
    theme_item:{
        width:116,
        height:34,
        borderWidth:2,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
    },
    h1_settings:{
        fontFamily:'MontserratAlt500',
        color:'white',
        fontSize:20,
    },
    theme_item_white_text:{
        fontFamily:'Montserrat500',
        color:'black',
        fontSize:22,
    },
    theme_item_yellow_text:{
        fontFamily:'Montserrat500',
        color:'black',
        fontSize:22,
    },
    theme_item_black_text:{
        fontFamily:'Montserrat500',
        color:'white',
        fontSize:22,
    },
    btn_settings:{
        width:54,
        height:38,
        backgroundColor:'white',
        borderWidth:2,
        borderColor:'black',
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
    },
    icn_field:{
        width:48,
        height:34
    },
    btn_prev_next:{
        flex:1,
        height:'100%',
        width:width/4,
        // backgroundColor:'blue',
        position:'absolute',
        
    },
    container_middle:{
        flex:1,
        height:'100%',
        width:width/2,
        // backgroundColor:'black',
        position:'absolute',
        left: width/4,
        right: width/4,
        textAlign: 'center',
    }
})