import { StyleSheet } from 'react-native';
import { redRarity } from '../../constants/colors';

export const stylesBookShopCard = StyleSheet.create({
    img_cover:{
        width:116,
        height:174,
        resizeMode:'contain',
        borderRadius:8,
    },
    text_title:{
        fontFamily:'Montserrat700',
        fontSize:11,
        marginTop:6,
    },
    text_author:{
        fontFamily:'Montserrat500',
        fontSize:11,
        marginTop:5,
    },
    text_price:{
        fontFamily:'Montserrat500',
        fontSize:12,
        color:redRarity,
        marginTop:5,
    },
    wrapper_book_shop_card:{
        width:116,

        
    }
});