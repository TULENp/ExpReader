import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { BookShopCard } from '../components/BookShopCard'
import { books } from '../TestData/books'
import { srcIcnBack } from '../constants/images'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { stylesFavoritesScreen } from './stylesScreen'

export default function FavoritesScreen({navigation}:any) {
    
    const listBooks:JSX.Element[] = books.map((book)=> <BookShopCard book={book}/>)
    
    return (
          <View style={stylesFavoritesScreen.fav_page}>
          <ScrollView>
            {/* <Image source={srcIcnBack}/> */}
            <View style={stylesFavoritesScreen.header_fav}>
              <TouchableOpacity onPress={() => navigation.navigate('Shop')} >
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