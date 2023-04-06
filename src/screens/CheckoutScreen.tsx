import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'; 
import { stylesCheckoutScreen } from './stylesScreen';
import { deepBlue } from '../constants/colors';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ShopStackParams, TBook } from '../types';
import { srcIcnSberbank, srcImgHarryPotter3 } from '../constants/images';
import { allBooks } from '../TestData/books';
import { Button } from 'react-native-elements';

type BookParams = {
    book: TBook;
}

export default function CheckoutScreen() {
    const { goBack } = useNavigation<NavigationProp<ShopStackParams>>();
    const { book } = useRoute<RouteProp<Record<string, BookParams>, string>>().params;
    const {id, title, cover, author, price} = book;
    return (
        <>
          <View style={stylesCheckoutScreen.checkout_page}>
            <ScrollView>
              <StatusBar backgroundColor = {deepBlue}/>
              {/* icon back and header text */}
              <View style={stylesCheckoutScreen.container_header}>
                <TouchableOpacity 
                                  onPress={()=> goBack()}
                                  >
                    <MaterialIcons name="keyboard-backspace" 
                                   size={36} 
                                   color="black" 
                                   />
                </TouchableOpacity>
                <Text style={stylesCheckoutScreen.text_header}>Покупка</Text>
              </View>
              {/* Payment method */}
              <View style={{marginTop:30}}>
                <Text style={stylesCheckoutScreen.text_header_light}>Способ оплаты</Text>
                <View style={{flexDirection:'row', marginTop:20, alignItems:'center'}}>
                  <Image style={stylesCheckoutScreen.icn_sber} source={srcIcnSberbank} />
                  <View style={{marginLeft:13}}>
                    <Text style={stylesCheckoutScreen.text_sber_online}>Сбербанк онлайн</Text>
                    <Text style={stylesCheckoutScreen.text_without_commission}>Без комиссии</Text>
                  </View>
                </View>
              </View>
              {/* section of book */}
              <View style={{marginTop:20, marginBottom:40}}>
                <Text style={stylesCheckoutScreen.text_header_light}>Книга</Text>
                <View style={{flexDirection:'row', marginTop:20}}>
                  <Image style={stylesCheckoutScreen.cover} source={srcImgHarryPotter3}/>
                  <View style={{flexShrink:1,paddingLeft:10}}>
                    <Text style={stylesCheckoutScreen.title}>{title}</Text>
                    <Text style={stylesCheckoutScreen.author}>{author}</Text>
                    <Text style={stylesCheckoutScreen.price}>{price}₽</Text>
                  </View>
                </View>
              </View>
              <Button title={'Оплатить'}
                      buttonStyle={stylesCheckoutScreen.button_buy}
                      titleStyle={{fontFamily:'Montserrat700', fontSize:18}}/>
            </ScrollView>
          </View>
        </>
    )
}