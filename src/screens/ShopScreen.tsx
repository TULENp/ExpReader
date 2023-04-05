import { View, Text, KeyboardAvoidingView, FlatList, ImageBackground, StatusBar, Image, TouchableOpacity, ImageSourcePropType, Dimensions, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { stylesShopScreen } from './stylesScreen'
import { books } from '../TestData/books';
import { BookShopCard } from '../components/BookShopCard';
import { deepBlue } from '../constants/colors';
import { Input } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { srcIcnFilter, srcIcnRedHeart, srcImgShopHeader } from '../constants/images';
import { NavigationProp, useNavigation, useScrollToTop } from '@react-navigation/native';
import { ShopStackParams } from '../types';

const width = Dimensions.get('window').width;

export default function ShopScreen() {
	const [searchText, setSearchText] = useState<string>('');
	const { navigate } = useNavigation<NavigationProp<ShopStackParams>>();


	const testList: JSX.Element[] = books.map((item) => {
		return (
			<TouchableOpacity onPress={() => navigate('ShopBook', { id: item.id })}
				style={{ maxWidth: 116, width: '100%' }}>
				<BookShopCard book={item} />
			</TouchableOpacity>
		)
	})

	const ads = [require('../../assets/Ad1.png'), require('../../assets/Ad2.png'), require('../../assets/Ad3.png')]
	const scrollToTop = useRef(null);

	useScrollToTop(scrollToTop);

	return (
		<>
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
						<Image style={{ width: 36, height: 36, }} source={srcIcnFilter} />
					</ImageBackground>

					<View style={{ flex: 1, marginTop: 10 }}>
						<GestureHandlerRootView>
							<Carousel width={width} autoPlay={true} autoPlayInterval={3000} scrollAnimationDuration={1000} height={151} data={ads} renderItem={({ item }) =>
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
		</>
	)
}