import {Dimensions, StyleSheet} from 'react-native';
import { black, deepBlue, lightBlue, white } from '../constants/colors';
//fonts
import { useFonts } from 'expo-font';
import {
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    } from '@expo-google-fonts/montserrat'
import {
    MontserratAlternates_300Light,
    MontserratAlternates_400Regular,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
   } from '@expo-google-fonts/montserrat-alternates'


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
        // backgroundColor: '#FFFFFF',
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
    }
})