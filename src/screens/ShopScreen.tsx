import { View, Text, KeyboardAvoidingView, FlatList, ImageBackground, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import { stylesShopScreen } from './stylesScreen'
import { books } from '../TestData/books';
import { BookShopCard } from '../components/BookShopCard';
import { deepBlue } from '../constants/colors';
import { Input } from '@rneui/themed';

export default function ShopScreen() {
    const [searchText, setSearchText] = useState<string>('');
    
    return (
        <>
          <KeyboardAvoidingView behavior='height' style={stylesShopScreen.shop_page}>
            
            <FlatList ListHeaderComponent={(
                <>
                  <StatusBar backgroundColor = {deepBlue}/>
                  <ImageBackground style={stylesShopScreen.img_header} source={require('../../assets/shopHeader.png')}>
                    <View style={stylesShopScreen.container_search_input}>
                        <Input onChangeText={text => setSearchText(text)}
                              placeholder={'Найти книги'}
                              inputContainerStyle={{borderBottomWidth:0 }}
                              leftIcon={{ type: 'octicons', name: 'search' }}
                              style={[stylesShopScreen.search_input, {fontFamily: 'MontserratAlt400'}]}/>
                    </View>
                    <Image style={{width:36, height:36, }} source={require('../../assets/heartRed.png')}/>
                    <Image style={{width:36, height:36, }} source={require('../../assets/filter.png')}/>
                  </ImageBackground>
                </>
            )} 
                    data={books} renderItem={(item) => <BookShopCard />}>

            </FlatList>
          </KeyboardAvoidingView>
        </>
    )
}