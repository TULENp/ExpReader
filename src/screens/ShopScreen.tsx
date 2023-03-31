import { View, Text, KeyboardAvoidingView, FlatList, ImageBackground, StatusBar, Image, ImageSourcePropType, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { stylesShopScreen } from './stylesScreen'
import { books } from '../TestData/books';
import { BookShopCard } from '../components/BookShopCard';
import { deepBlue } from '../constants/colors';
import { Input } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { srcIcnFilter, srcIcnRedHeart, srcImgShopHeader } from '../constants/images';

const width = Dimensions.get('window').width;

export default function ShopScreen() {
    const [searchText, setSearchText] = useState<string>('');
    
    const ads = [require('../../assets/Ad1.png'),require('../../assets/Ad2.png'), require('../../assets/Ad3.png')]

    return (
        <>
          <KeyboardAvoidingView behavior='height' style={stylesShopScreen.shop_page}>
            <FlatList ListHeaderComponent={(
                <>
                  <StatusBar backgroundColor = {deepBlue}/>
                  <ImageBackground style={stylesShopScreen.img_header} source={srcImgShopHeader}>
                    <View style={stylesShopScreen.container_search_input}>
                        <Input onChangeText={text => setSearchText(text)}
                              placeholder={'Найти книги'}
                              inputContainerStyle={{borderBottomWidth:0 }}
                              leftIcon={{ type: 'octicons', name: 'search' }}
                              style={[stylesShopScreen.search_input, {fontFamily: 'MontserratAlt400'}]}/>
                    </View>
                    <Image style={{width:36, height:36, }} source={srcIcnRedHeart}/>
                    <Image style={{width:36, height:36, }} source={srcIcnFilter}/>
                  </ImageBackground>
                  <View style={{flex:1}}>
                    <GestureHandlerRootView>
                      <Carousel  width={width}  autoPlay={true} autoPlayInterval={5000}  scrollAnimationDuration={1000} height={151}   data={ads} renderItem={({item}) => 
                          <View style={stylesShopScreen.container_adds_carousel}>
                            <Image style={{width:364, height:151}} source={item}/>
                          </View>
                      } />
                    </GestureHandlerRootView>
                  </View>

                </>
            )} 
                    data={books} renderItem={(item) => <BookShopCard />}>

            </FlatList>
          </KeyboardAvoidingView>
        </>
    )
}