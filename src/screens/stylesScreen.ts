import {Dimensions, StyleSheet} from 'react-native';
import { black, deepBlue, gray, greenRarity, lightBlue, pink, purple, redRarity, white, yellowRarity } from '../constants/colors';

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
        right:'5%', 
        bottom:'2%',
    },
    text_empty_list:{
        fontFamily:'MontserratAlt400',
        fontSize:18,
        textAlign:'center',
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
        borderRadius:8,
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
        justifyContent:'center',
    },
    img_add:{
        width:364, 
        height:151
    },
    text_shop:{
        fontFamily:'MontserratAlt700',
        fontSize:25,
        marginLeft:13,
        marginTop:15,
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

export const stylesProfileScreen = StyleSheet.create({
    img_header:{
        width:width,
        height:214,
        paddingTop:40,
        paddingLeft:13,
        paddingRight:13,
        flexDirection:'row',
        position:'relative'
    },
    avatar:{
        backgroundColor: lightBlue
    },
    icn_points:{
        width:25,
        height:25,
        marginRight:10,
    },
    container_avatar_points:{
        marginLeft:10
    },
    text_points:{
        fontFamily:'Montserrat700',
        fontSize:18,
        color:white,
    },
    text_name:{
        fontFamily:'Montserrat700',
        fontSize:20,
        color:white,
        marginBottom:10,
    },
    container_level:{
        // flexGrow:1,
        width:'100%',
        padding:13,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        elevation:15,
        borderRadius:8,
    },
    test:{
        // width:width,
        width:'100%',
        // flexGrow:1,
        paddingLeft:13,
        paddingRight:13,
        flexWrap:'nowrap',
        marginTop:-55,
    },
    icn_settings:{
        width:18,
        height:18,
        marginLeft:'20%',
        
    },
    progress_bar:{
        width:'90%',
        borderRadius:12,
        marginTop:12,
    },
    text_level_bold:{
        fontFamily:'MontserratAlt700',
        fontSize:16,
        color:'black',
        width:'100%',
        textAlign:'center',
    },
    text_level_medium:{
        fontFamily:'MontserratAlt500',
        fontSize:16,
    },
    text_level_light:{
        fontFamily:'MontserratAlt300',
        fontSize:16,
        color:'black',
        marginTop:12,
    },
    wrapper_text_level_settings:{
        width:'75%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    h1_profile_bold:{
        fontFamily:'MontserratAlt700',
        fontSize:20,
    },
    h1_profile_medium:{
        fontFamily:'MontserratAlt500',
        fontSize:20,
    },
    container_achievements:{
        width:'100%',
        paddingLeft:13,
        paddingRight:13,
        marginTop:20,
    },
    wrapper_pins:{
        // width:70,
        // height:70,
        // // height:'50%',
        // // borderWidth:1,
        // borderRadius:8,
        // overflow:'hidden',
        // // elevation:10,
        // // backgroundColor:lightBlue,
        // flexDirection:'row',
        // // justifyContent:'center',
        // // alignItems:'center',
        // marginTop:15,
        // // paddingTop:8,
        // // paddingBottom:8,
        // elevation:15,
        width:'100%',
        borderRadius:8,
        padding:13,
        flexDirection:'row',
        elevation:15,
        backgroundColor:'white',
        marginTop:10,
    },
    img_pin:{
        width:70,
        height:70,
    },
    text_empry:{
        fontFamily:'MontserratAlt700',
        fontSize:14,
        width:190,
    },
    empty_component_achiv:{
        width:'100%',
        borderRadius:8,
        padding:13,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        elevation:15,
        backgroundColor:'white',
        marginTop:10,
        gap:20,
        // maxWidth:width,
    },
    container_profile_books:{
        flex:1,
        width:'100%',
        flexWrap:'wrap',
        gap:24,
        marginTop:10,
        alignItems:'center',
        flexDirection:'row',
    },
    profile_page:{
        flex:1,
        width:width,
        backgroundColor:'white',
    },
    container_bookshelf:{
        width:width,
        paddingLeft:13,
        paddingRight:13,
        marginTop:20,
    },
    empty_text:{
        fontFamily:'MontserratAlt400',
        fontSize:18,
        textAlign:'center',
    },

})

export const stylesFavoritesScreen = StyleSheet.create({
    fav_page:{
        flex:1,
        
        backgroundColor:white,
        paddingLeft:13,
        paddingRight:13,
        paddingTop:20,
    },
    header_fav:{
        flexDirection:'row',
        alignItems:'center',
        
    },
    container_books:{
        // flexDirection:'row',
        width:'100%',
        // gap:8,
        // flexWrap:'wrap',
        marginTop:20,
    },
    fav_title:{
        fontFamily:'MontserratAlt700',
        fontSize:25,
        marginLeft:20,
    }
    
})

export const stylesBookScreen = StyleSheet.create({
    book_screen:{
        flex:1,
        width:width,
        backgroundColor:'white',
    },
    book_header:{
        width:width,
        height:290,
        position:'relative',
    },
    img_header:{
        width:'100%',
        maxWidth:width,
        height:210,
        position:'absolute',
    },
    img_heart:{
        width:28,
        height:28,
    },
    container__cover_book_info:{
        
        width:width,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:20,
        paddingLeft:13,
        paddingRight:13,
    },
    icn_back:{
        marginLeft:13,
        marginTop:20,
    },
    img_cover:{
        // width:'100%',
        // maxWidth:133,
        width:133,
        // height:150,
        height:198,
        overflow:'hidden',
        borderRadius:8,
        resizeMode:'contain',
    },
    wrapper_img_cover:{
        maxWidth:146, 
        height:208
    },
    title:{
        fontFamily:'Montserrat700',
        fontSize:18,
        color:white,
        // flexShrink:1,
    },
    author:{
        fontFamily:'Montserrat500',
        fontSize:16,
        color:white,
        marginTop:15,
    },
    icn_rarity:{
        width:41,
        height:41,
        marginTop:7,
    },
    book_info:{
        width:'100%',
        // maxWidth:'100%',
        flexShrink:1,
        paddingLeft:36,

    },
    button_buy:{
        backgroundColor:purple,
        borderRadius:8,
        borderWidth:1,
        borderColor:black,
    },
    button_buy_label_bold:{
        fontFamily:'Montserrat700',
        fontSize:18,
        color:white,
    },
    button_buy_label_light:{
        fontFamily:'Montserrat300',
    },
    container_fav_fragment_buttons:{
        flexDirection:'row',
        alignItems:'stretch',
        paddingTop:8,
        gap:8,
    },
    button_fav_grow:{
        flexGrow:1,
        borderRadius:8,
    },
    button_fragment_grow:{
        flexGrow:3,
        borderRadius:8,
    },
    button_fav:{
        backgroundColor:lightBlue,
        borderWidth:1,
        borderColor:black,
        borderRadius:8,
    },
    button_fragment:{
        backgroundColor:deepBlue,
        borderWidth:1,
        borderColor:black,
        borderRadius:8,
    },
    button_title:{
        fontFamily:'MontserratAlt700',
        fontSize:18,
    },
    container_all_buttons:{
        paddingTop:30,
    },
    container_genres:{
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:8,
        paddingTop:8,
        paddingBottom:8,
        paddingRight:13,
        paddingLeft:13,
        marginRight:8,
    },
    text_genres:{
        fontFamily:'MontserratAlt400',
        fontSize:14,
        color:pink
    },
    text_header:{
        fontFamily:'MontserratAlt700',
        fontSize:18,
        marginBottom:8,
    },
    text_amount_pages:{
        fontFamily:'MontserratAlt700',
        fontSize:18,
        marginLeft:13,
        marginTop:20,
    },
    text_rarity_bold:{
        fontFamily:'MontserratAlt700',
        fontSize:18,
    },
    text_rarity_light:{
        fontFamily:'MontserratAlt400',
        color:'#737373',
        fontSize:18,
        marginLeft:8
    },
    text_description:{
        fontFamily:'Montserrat500',
        fontSize:16
    },

})

export const stylesCheckoutScreen = StyleSheet.create({
    checkout_page:{
        flex:1,
        paddingLeft:13,
        paddingRight:13,
        paddingTop:20,
    },
    icn_sber:{
        width:26,
        height:26
    },
    text_header:{
        fontFamily:'MontserratAlt700',
        fontSize:25, 
    },
    container_header:{
        flexDirection:'row', 
        gap:20, 
        alignItems:'center', 
        
    },
    text_header_light:{
        fontFamily:'MontserratAlt500',
        fontSize:22, 
    },
    text_sber_online:{
        fontFamily:'Montserrat500',
        fontSize:16, 
    },
    text_without_commission:{
        fontFamily:'Montserrat300',
        fontSize:16, 
    },
    cover: {
        width: '100%',
        height: 174,
        maxWidth:110,
        maxHeight:166,
        borderRadius:8,
    },
    title:{
        fontFamily:'Montserrat700',
        fontSize:16,
    },
    author:{
        fontFamily:'Montserrat500',
        fontSize:14,
        marginTop:8,
    },
    price:{
        fontFamily:'Montserrat700',
        fontSize:18,
        marginTop:8,
        color:redRarity,
    },
    button_buy:{
        borderRadius:8,
        backgroundColor:greenRarity,
        
    }
})

export const stylesDailyTaskScreen= StyleSheet.create({
    daily_task_page:{
        alignSelf: 'center', 
        paddingLeft:13, 
        paddingRight:13, 
        paddingTop:20, 
        flex:1,
        backgroundColor:'white',
    },
    text_bold_large:{
        fontFamily:'MontserratAlt700',
        color:white,
        fontSize:32,
    },
    text_bold_medium:{
        fontFamily:'MontserratAlt700',
        fontSize:18,
    },
    text_medium:{
        fontFamily:'MontserratAlt500',
        color:white,
        fontSize:14,
        textAlign:'center',
    },
    container_daily_task:{
        width:116,
        height:116,
        paddingTop:20,
        paddingBottom:20,
        paddingRight:5,
        paddingLeft:5,
        borderWidth:1,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#000000',
    },
    container_daily_task_active:{
        width:116,
        height:116,
        paddingTop:20,
        paddingBottom:20,
        paddingRight:5,
        paddingLeft:5,
        borderWidth:5,
        borderColor:yellowRarity,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
    },
    wrapper_containers:{
        marginTop:30,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    text_description:{
        fontFamily:'Montserrat700',
        fontSize:14,
        marginLeft:8,
    }

})

export const stylesAchievementsScreen = StyleSheet.create({
    container_achiv:{
        flex:1,
        flexDirection:'row', 
        gap:8,
        marginBottom:10,
    },
    wrapper_pin:{
        maxWidth:100,
        flexGrow:1, 
        backgroundColor:deepBlue, 
        paddingTop:5, 
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderTopRightRadius:10,
        borderBottomEndRadius:10,
    },
    wrapper_pin_info:{
        flexGrow:3,
        maxWidth:'100%',
        backgroundColor:deepBlue,
        borderBottomStartRadius:10,
        borderTopLeftRadius:10,
        paddingBottom:8,
        paddingTop:8,
        paddingLeft:8,
        paddingRight:8,
    },
    title:{
        fontFamily:'MontserratAlt700',
        fontSize:14,
        color:white,
    },
    author:{
        fontFamily:'MontserratAlt500',
        fontSize:12,
        color:white,
    },
    achievements_page:{
        paddingTop:20,
        flex:1,
        backgroundColor:'white',
    }
})

export const stylesSignInScreen = StyleSheet.create({
    page:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:70,
        paddingRight:70,
        backgroundColor:'white',
    },
    h1:{
        fontFamily:'MontserratAlt500',
        fontSize:16,

    },
    input: {
        fontFamily:'MontserratAlt700',
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        // marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: lightBlue,
        paddingTop: 10,
        paddingBottom:10,
        width:'100%',
        borderRadius: 8,
    },
    buttonText: {
        fontSize:18,
        fontFamily:'MontserratAlt500',
        color: 'white',
        textAlign: 'center',
    },
    logo:{
        width:221,
        height:163,
        marginBottom:50,
    },
    header:{
        position:'absolute',
        top:40,
        left:20
    },
    
})