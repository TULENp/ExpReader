import {Dimensions, StyleSheet} from 'react-native';
import { lightBlue } from '../constants/colors';
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
// let [fontsLoaded] = useFonts({
//     'Montserrat300': Montserrat_300Light,
//     'Montserrat400': Montserrat_400Regular,
//     'Montserrat500': Montserrat_500Medium,
//     'Montserrat700': Montserrat_700Bold,
//     'MontserratAlt300': MontserratAlternates_300Light,
//     'MontserratAlt400': MontserratAlternates_400Regular,
//     'MontserratAlt500': MontserratAlternates_500Medium,
//     'MontserratAlt700': MontserratAlternates_700Bold,
// })

export const stylesLibraryScreen = StyleSheet.create({
    lib_page:{
        maxWidth: width,
        flex:1,
        alignContent:'center',
        backgroundColor:'#F50058',
    },
    container_header:{
        flex:1,
        width: width,
        
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
        marginLeft:'1.4%', 
        marginRight:'1.4%', 
        borderRadius:8,
        marginTop:35,
    },

})