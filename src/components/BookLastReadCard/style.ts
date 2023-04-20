import { StyleSheet } from "react-native"
import { deepBlue, purple, white } from "../../constants/colors"

export const stylesReadLater = StyleSheet.create({
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
    empty_cover_book: {
        resizeMode: 'contain',
        width: 139,
        height: 199,
        borderRadius: 8,
        backgroundColor: purple,
        paddingTop: 30,
        paddingLeft: 5,
        paddingRight: 5,
    },
    text_empty_cover_book: {
        fontFamily: 'MontserratAlt500',
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
})