import { View, Text, KeyboardAvoidingView, ImageBackground, StatusBar, Image, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { stylesShopScreen } from './stylesScreen'
import { BookShopCard } from '../components/BookShopCard';
import { deepBlue, lightBlue } from '../constants/colors';
import { Input } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { srcIcnCloudCry, srcIcnFilter, srcIcnNoInternet, srcIcnRedHeart, srcImgShopHeader } from '../constants/images';
import { ShopStackParams, TShopBook } from '../types';
import { NavigationProp, useNavigation, useScrollToTop } from '@react-navigation/native';
import { Filters } from '../components/Filters';
import Drawer from 'react-native-drawer';
import { GetAllShopBooks } from '../service/api';
import { AppContext } from '../context/AppContext';

const width = Dimensions.get('window').width;

export type TFilters = {
	sortID: string,
	rarity: number | null,
	searchValue: string,
	genres: number[],
}

const filtersInit: TFilters = {
	sortID: '0',
	rarity: null,
	searchValue: '',
	genres: [],
}

export function ShopScreen() {
	const scrollToTop = useRef(null);
	useScrollToTop(scrollToTop);
	const { navigate, getParent } = useNavigation<NavigationProp<ShopStackParams>>();
	const ads = [require('../../assets/Ad1.png'), require('../../assets/Ad2.png'), require('../../assets/Ad3.png')];

	const [books, setBooks] = useState<TShopBook[]>([]);
	const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
	const [filters, setFilters] = useState<TFilters>(filtersInit);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { netInfo } = useContext(AppContext)

	useEffect(() => {
		getBooks();
	}, [])

	async function getBooks(isReset: boolean = false) {
		setIsLoading(true);
		const books = await GetAllShopBooks(isReset ? filtersInit : filters);
		if (isReset) {
			setFilters(filtersInit);
		}
		setBooks(books);
		setIsLoading(false);
	}

	const booksList: JSX.Element[] = books.map((book) => {
		return (
			<TouchableOpacity key={book.id} style={{ maxWidth: 116, width: '100%' }} onPress={() => navigate('ShopBook', { id: book.id })}>
				<BookShopCard book={book} />
			</TouchableOpacity>
		)
	})

	const drawerStyles = {
		drawer: { backgroundColor: 'white', shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 3, },
	}

	return (
		<>	
			{isLoading
				?
				<View style={{width:'100%', height:'100%',backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
					<ActivityIndicator  size={'large'} color={deepBlue}/>
				</View>
				:
				<>
				{!netInfo?.isInternetReachable
					?
					<View style={{width:'100%', height:'100%',backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
						<Image style={{width:45, height:45}} source={srcIcnNoInternet}/>
						<Text style={{fontFamily:'MontserratAlt400', fontSize:20,textAlign:'center'}}>Нет доступа к интернету</Text>
					</View>
					:
					<>
						<StatusBar backgroundColor={deepBlue} />
						<Drawer type='overlay'
							content={<Filters filters={filters} setFilters={setFilters} filterBooks={getBooks} />}
							open={isOpenDrawer}
							onClose={() => setIsOpenDrawer(false)}
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
									<ImageBackground style={stylesShopScreen.img_header} source={srcImgShopHeader}>
										<View style={stylesShopScreen.container_search_input}>
											<Input value={filters.searchValue}
												onChangeText={(text) => {
													setFilters((prev) => {
														return {
															...prev,
															searchValue: text
														}
													});
												}}
												onSubmitEditing={() => getBooks()}
												placeholder={'Найти книги'}
												inputContainerStyle={{ borderBottomWidth: 0 }}
												leftIcon={{ type: 'octicons', name: 'search' }}
												style={[stylesShopScreen.search_input, { fontFamily: 'MontserratAlt400' }]} />
										</View>
										<TouchableOpacity onPress={() => navigate('Favorites')}>
											<Image style={{ width: 36, height: 36, }} source={srcIcnRedHeart} />
										</TouchableOpacity>
										<TouchableOpacity onPress={() => setIsOpenDrawer(prev => !prev)}>
											<Image style={{ width: 36, height: 36, }} source={srcIcnFilter} />
										</TouchableOpacity>
									</ImageBackground>
									{/* <View style={{ flex: 1, marginTop: 10 }}> */}
									<GestureHandlerRootView style={{ flex: 1, marginTop: 10 }}>
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
									{/* </View> */}
									<Text style={stylesShopScreen.text_shop}>Магазин</Text>
									<View style={stylesShopScreen.container_books_shop_card}>
										{books.length === 0
											?
											<View style={{width:'100%', height:'100%', flex:1,justifyContent:'center', alignItems:'center'}}>
												<Image style={{width:80, height:80}} source={srcIcnCloudCry}/>
												<Text style={{fontFamily:'MontserratAlt400', fontSize:18}}>Книги не найдены</Text>
												<TouchableOpacity onPress={()=>getBooks(true)} style={{width:'70%', height:40,marginTop:20, justifyContent:'center', alignItems:'center', backgroundColor:lightBlue, borderRadius:8}}>
													<Text style={{fontFamily:'MontserratAlt700', fontSize:18, color:'white'}}>Сбросить фильтры</Text>
												</TouchableOpacity>
											</View>
											:
											booksList}
									</View>
								</ScrollView>
							</KeyboardAvoidingView>
						</Drawer>
					</>
				}
					
				</>
				}
				

		</>
	)
}
