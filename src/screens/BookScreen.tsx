import { View, Text, Image, TouchableOpacity, StatusBar, ImageBackground } from 'react-native'
import React from 'react'
import { ShopStackParams, TBook, TShopBook } from '../types';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { stylesBookScreen } from './stylesScreen';
import { srcIcnBronze, srcIcnHeart, srcIcnRedHeart, srcImgBookHeader, srcImgHarryPotter3 } from '../constants/images';
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from '@rneui/themed';
import { deepBlue, greenRarity } from '../constants/colors';
import { Shadow } from 'react-native-shadow-2';

type BookParams = {
    book: TBook;
}

export default function BookScreen() {

   console.log("BOOOK SCREEN");
//    const {id, title} = route.params;
   const { book, } = useRoute<RouteProp<Record<string, BookParams>, string>>().params;
   const { goBack } = useNavigation<NavigationProp<ShopStackParams>>();
   const {id, title, cover, author, price, description, bookPages, fragment, genre, isFavorite} = book;
    
   return (
        <>
          <View style={stylesBookScreen.book_screen}>
            <ScrollView>
                {/* bookScreen header */}
                <StatusBar backgroundColor = {deepBlue}/>
                <View style={stylesBookScreen.book_header}>
                    <Image style={stylesBookScreen.img_header} source={srcImgBookHeader}/>
                    <TouchableOpacity style={stylesBookScreen.icn_back}
                                      onPress={()=> goBack()}
                                      >
                      <MaterialIcons name="keyboard-backspace" 
                                     size={36} 
                                     color="white" 
                                     />
                      
                    </TouchableOpacity>
                    <View style={stylesBookScreen.container__cover_book_info}>
                        <View style={stylesBookScreen.wrapper_img_cover}>
                          <Shadow distance={1}  startColor={greenRarity} offset={[9, 9]}>
                            <ImageBackground style={stylesBookScreen.img_cover} source={srcImgHarryPotter3}>
                              <Image style={stylesBookScreen.icn_rarity} source={srcIcnBronze}/>
                            </ImageBackground>
                        </Shadow>
                        </View>
                      <View style={stylesBookScreen.book_info}>
                        <Text style={stylesBookScreen.title}>{title}</Text>
                        <Text style={stylesBookScreen.author}>{author}</Text>
                        <View style={stylesBookScreen.container_all_buttons}>
                          <Button title={<Text style={stylesBookScreen.button_buy_label_bold}>Купить за 
                          <Text style={stylesBookScreen.button_buy_label_light}> {price}₽</Text></Text>}
                                buttonStyle={stylesBookScreen.button_buy}/>
                            <View style={stylesBookScreen.container_fav_fragment_buttons}>
                              <Button icon={ isFavorite ?
                                <Image style={stylesBookScreen.img_heart} source={srcIcnRedHeart}/>
                                :
                                <Image style={stylesBookScreen.img_heart} source={srcIcnHeart}/>
                                }
                                      buttonStyle={stylesBookScreen.button_fav}
                                      containerStyle={stylesBookScreen.button_fav_grow}
                                      />
                              <Button title={'Фрагмент'}
                                      titleStyle={stylesBookScreen.button_title}
                                      buttonStyle={stylesBookScreen.button_fragment}
                                      containerStyle={stylesBookScreen.button_fragment_grow}
                                      />
                            </View>
                        </View>
                      </View>
                    </View>
                </View>
            {/* <Button title='to reader screen' onPress={() => navigate("Reader", )} /> */}
            </ScrollView>
          </View>
        </>
        
    )
}