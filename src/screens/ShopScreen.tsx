import { View, Text, KeyboardAvoidingView, FlatList, ImageBackground, StatusBar, Image, TouchableOpacity, ImageSourcePropType, Dimensions, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { stylesShopScreen } from './stylesScreen'
import { allBooks, books } from '../TestData/books';
import { BookShopCard } from '../components/BookShopCard';
import { deepBlue } from '../constants/colors';
import { Input } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { srcIcnFilter, srcIcnRedHeart, srcImgShopHeader } from '../constants/images';
import { ShopStackParams } from '../types';
import { NavigationProp, useNavigation, useScrollToTop } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Filters } from '../components/Filters';
import Drawer from 'react-native-drawer';


const width = Dimensions.get('window').width;

export default function ShopScreen() {
  const scrollToTop = useRef(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const { navigate } = useNavigation<NavigationProp<ShopStackParams>>();
  const testList: JSX.Element[] = allBooks.map((book) => {
    return (
      <TouchableOpacity style={{ maxWidth: 116, width: '100%' }} onPress={() => navigate('ShopBook', { book })}>
        <BookShopCard book={book} />
      </TouchableOpacity>
    )
  })


  useScrollToTop(scrollToTop);
  const drawerStyles = {
    drawer: { backgroundColor: 'white', shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 3, },
    // main: {backgroundColor:'#000000'},
    // drawerOverlay:{ shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 8,},
  }


  return (
    <>
      <Drawer type='overlay'
        content={<Filters />}
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(!isOpenDrawer)}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        // closedDrawerOffset={-1}
        styles={drawerStyles}
        side='right'
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}


      >
        <KeyboardAvoidingView behavior='height' style={stylesShopScreen.shop_page}>
          <ScrollView ref={scrollToTop}>
            <StatusBar backgroundColor={deepBlue} />
            <ImageBackground style={stylesShopScreen.img_header} source={srcImgShopHeader}>
              <View style={stylesShopScreen.container_search_input}>
                <Input onChangeText={text => setSearchText(text)}
                  placeholder={'Найти книги'}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  leftIcon={{ type: 'octicons', name: 'search' }}
                  style={[stylesShopScreen.search_input, { fontFamily: 'MontserratAlt400' }]} />
              </View>
              <TouchableOpacity onPress={() => navigate('Favorites')}>
                <Image style={{ width: 36, height: 36, }} source={srcIcnRedHeart} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsOpenDrawer(!isOpenDrawer)}>
                <Image style={{ width: 36, height: 36, }} source={srcIcnFilter} />
              </TouchableOpacity>
            </ImageBackground>
            <View style={{ flex: 1, marginTop: 10 }}>
              <GestureHandlerRootView>
                <Carousel width={width} autoPlay={true}
                  autoPlayInterval={3000}
                  scrollAnimationDuration={2000}
                  height={151}
                  data={ads}
                  renderItem={({ item }) =>
                    <View style={stylesShopScreen.container_adds_carousel}>
                      <Image style={stylesShopScreen.img_add} source={item} />
                    </View>
                  } />
              </GestureHandlerRootView>
            </View>
            <Text style={stylesShopScreen.text_shop}>Магазин</Text>
            <View style={stylesShopScreen.container_books_shop_card}>
              {testList}
              {testList}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Drawer>

    </>
  )
}
