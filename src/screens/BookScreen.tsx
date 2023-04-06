import { View, Text, Image, TouchableOpacity, StatusBar, ImageBackground, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ShopStackParams, TBook, TRarity } from '../types';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { stylesBookScreen } from './stylesScreen';
import { srcIcnBronze, srcIcnHeart, srcIcnRedHeart, srcImgBookHeader, srcImgHarryPotter3 } from '../constants/images';
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from '@rneui/themed';
import { blueRarity, deepBlue, greenRarity, redRarity, yellowRarity } from '../constants/colors';
import { Shadow } from 'react-native-shadow-2';
import { Feather } from '@expo/vector-icons'; 

type BookParams = {
    book: TBook;
}

export default function BookScreen() {

   const width = Dimensions.get('window').width;
   console.log("BOOOK SCREEN");
//    const {id, title} = route.params;
   const { book } = useRoute<RouteProp<Record<string, BookParams>, string>>().params;
   const { goBack } = useNavigation<NavigationProp<ShopStackParams>>();
   const {id, title, cover, author, price, description, bookPages, fragment, genre, isFavorite} = book;
   const [colorRarity, setColorRarity] = useState<string>('');
   const [rarityOfBook, setRarityofBook] = useState<string>('');
   const { navigate } = useNavigation<NavigationProp<ShopStackParams>>();

   const listGenres:JSX.Element[] = genre.map((item)=> {
    return(
      <View style={stylesBookScreen.container_genres}>
        <Text style={stylesBookScreen.text_genres}>{item}</Text>
      </View>
    )
  })

   const GetRarityOfBook = (bookPages:number):string =>{
    if (bookPages<=250){
      setColorRarity(greenRarity)
      return 'обычная'
    };
    if ((bookPages>250) && (bookPages<=650)){
      setColorRarity(blueRarity)
      return 'редкая'
    }
    if ((bookPages>650) && (bookPages<=950)){
      setColorRarity(redRarity)
      return 'эпическая'
    }
    if (bookPages>950){
      setColorRarity(yellowRarity)
      return 'легендарная'
    }
    return ''
  }
  
  useEffect(() => {
     setRarityofBook(GetRarityOfBook(bookPages))
  },[]);

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
                          <Shadow distance={1}  startColor={colorRarity} offset={[9, 9]}>
                            <ImageBackground style={stylesBookScreen.img_cover} source={srcImgHarryPotter3}>
                              <Image style={stylesBookScreen.icn_rarity} source={srcIcnBronze}/>
                            </ImageBackground>
                        </Shadow>
                        </View>
                      <View style={stylesBookScreen.book_info}>
                        <Text style={stylesBookScreen.title}>{title}</Text>
                        <Text style={stylesBookScreen.author}>{author}</Text>
                        <View style={stylesBookScreen.container_all_buttons}>
                          <Button title={<Text style={stylesBookScreen.button_buy_label_bold}
                                  onPress={()=> navigate('Checkout')}
                          >Купить за 
                          <Text style={stylesBookScreen.button_buy_label_light}> {price}₽</Text></Text>}
                                buttonStyle={stylesBookScreen.button_buy}
                                containerStyle={{borderRadius:8}}/>
                            <View style={stylesBookScreen.container_fav_fragment_buttons}>
                              <Button icon={ 
                                isFavorite ?
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
                    {/* bookScreen header */}
                </View>
                {/* section genres of book */}
                <View style={{paddingLeft:13, marginTop:20}}>
                  <Text style={stylesBookScreen.text_header}>Жанры</Text>
                  <FlatList horizontal
                            showsHorizontalScrollIndicator={false}
                            data={genre}
                            renderItem={({item})=> 
                              <View style={stylesBookScreen.container_genres}>
                                <Text style={stylesBookScreen.text_genres}>{item}</Text>
                              </View>}
                            />
                </View> 
                {/* section genres of book */}
                <Text style={stylesBookScreen.text_amount_pages}>Кол-во страниц:
                  <Text style={{fontFamily:'MontserratAlt500'}}> {bookPages}</Text>
                </Text>
                {/* rarity of book */}
                <View style={{flexDirection:'row', marginLeft:13, marginTop:20}}>
                  <Feather name="info" size={24} color="#737373" />
                  <Text style={stylesBookScreen.text_rarity_light}>Редкость:</Text>
                  <Text style={[{color:colorRarity}, stylesBookScreen.text_rarity_bold]}> {rarityOfBook}</Text>
                </View>
                {/* description of book */}
                <View style={{marginLeft:13, marginTop:20, marginRight:13}}>
                  <Text style={stylesBookScreen.text_header}>Синопсис</Text>
                  <Text style={stylesBookScreen.text_description}>
                    {description}
                  </Text>
                </View>

                
            {/* <Button title='to reader screen' onPress={() => navigate("Reader", )} /> */}
            </ScrollView>
          </View>
        </>
        
    )
}