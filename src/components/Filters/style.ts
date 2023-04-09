import { StyleSheet} from 'react-native';
import { black } from '../../constants/colors';

export const stylesFilters= StyleSheet.create({
    container_style:{
        marginVertical:0,
        marginHorizontal:0,
        borderWidth:0,
        maxWidth:304, 
        width:'100%', 
        height:500, 
        justifyContent:'space-between', 
        flexWrap:'wrap',
        rowGap:8,
    },
    button_container_style:{
        flex:0, 
        maxWidth:210,
        borderRightWidth:0,
        borderRadius:8, 
        
        backgroundColor:'#EEEEEE', 
        height:35,
    },
    text_style:{
        fontFamily:'MontserratAlt500',
        fontSize:14,
        color:'#000000',
    },
    
})