import {Dimensions, StyleSheet} from 'react-native';
import { black, deepBlue, lightBlue, white } from '../constants/colors';



let {width} = Dimensions.get('window');


export const stylesLibraryScreen = StyleSheet.create({
    lib_page:{
        maxWidth: width,
        flex:1,
        alignContent:'center',
        backgroundColor:white,
    },
    container_header:{
        flex:1,
        width: width,
        height:120,
    },
    img_header:{
        width: width,
        height:'39%',
        position:'absolute',
        elevation:1,

    },
    search_input:{
        marginLeft:'1.4%',
        marginRight:'1.4%',
        color:'#000000',
        maxWidth: width,
        fontSize:14,
        borderRadius:8,
    },
    container_search_input:{
        backgroundColor:'#FFFFFF', 
        height:50, 
        marginLeft:13, 
        marginRight:13, 
        borderRadius:8,
        marginTop:35,
    },
    img_cover_read_later:{
        resizeMode:'contain',
        width:139,
        height:199,
        borderRadius:8,
    },
    container_read_later:{
        flexDirection:'row', 
        paddingRight:13, 
        paddingLeft:13, 
        paddingTop:25, 
        paddingBottom:25,
        backgroundColor:deepBlue,
    },
    text_h1_read_later:{
        fontFamily:'MontserratAlt700',
        color:white, 
        fontSize:20,
    },
    text_h2_read_later:{
        fontFamily:'Montserrat700',
        color:white, 
        fontSize:14,
        marginTop:16,
    },
    text_h3_read_later:{
        fontFamily:'Montserrat400',
        color:white, 
        fontSize:14,
    },
    text_progress_bar:{
        fontFamily:'Montserrat300',
        color:white, 
        fontSize:14,
        marginTop:21,
    },
    progress_bar:{
        transform: [{scaleY: 1.5}], 
        borderRadius:8, 
        marginTop:10,
    },
    h1_library:{
        fontFamily:'MontserratAlt700',
        fontSize:25,
        marginLeft:13,
    },
    button_group_containerStyle:{
        backgroundColor:white, 
        borderColor:black, 
        borderRadius:8, 
        marginLeft:13, 
        marginRight:13, 
        alignItems:'center',
    },
    button_group_textStyle:{
        color:deepBlue, 
        fontFamily:'Montserrat500', 
        fontSize:15,
    },
    fab_button:{
        position:'absolute', 
        elevation:1,
        zIndex:5, 
        right:'8%', 
        bottom:'5%',
    }
})

export const stylesShopScreen = StyleSheet.create({
    shop_page:{
        flex:1,
        maxWidth:width,
        backgroundColor:white,
    },
    img_header:{
        flex:1,
        width: width,
        height:120,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:13,
        paddingRight:13
        
    },
    container_search_input:{
        backgroundColor:'#FFFFFF', 
        height:50, 
        // marginLeft:13, 
        // marginRight:13, 
        borderRadius:8,
        // marginTop:35,
        width:'65%',
    },
    search_input:{
        marginLeft:'1.4%',
        marginRight:'1.4%',
        color:'#000000',
        maxWidth: '100%',
        fontSize:14,
        borderRadius:8,
    },
    container_adds_carousel:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'center'
    },
    img_add:{
        width:364, 
        height:151
    },
    text_shop:{
        fontFamily:'MontserratAlt700',
        fontSize:25,
        marginLeft:13,
        marginTop:25,
        marginBottom:14,
    },
    container_books_shop_card:{
        flex:1,
        width:width,
        paddingLeft:13,
        paddingRight:12,
        flexDirection:'row',
        gap:9.5,
        flexWrap:'wrap',
        
    }

})