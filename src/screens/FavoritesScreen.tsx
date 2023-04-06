import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { BookShopCard } from '../components/BookShopCard'
import { books } from '../TestData/books'
import { srcIcnBack } from '../constants/images'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { stylesFavoritesScreen } from './stylesScreen'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ShopStackParams } from '../types'

export default function FavoritesScreen() {
    
    const listBooks:JSX.Element[] = books.map((book)=> <BookShopCard book={book}/>)
    const { goBack } = useNavigation<NavigationProp<ShopStackParams>>();
    
    return (
          <View style={stylesFavoritesScreen.fav_page}>
          <ScrollView>
            {/* <Image source={srcIcnBack}/> */}
            <View style={stylesFavoritesScreen.header_fav}>
              <TouchableOpacity onPress={() => goBack()} >
                <MaterialIcons name="keyboard-backspace" size={36} color="black" />
              </TouchableOpacity>
              <Text style={stylesFavoritesScreen.fav_title}>Избранное</Text>
            </View>
            <View style={stylesFavoritesScreen.container_books}>
              {listBooks}
              {listBooks}
            </View>
          </ScrollView>
          </View>
    )
}