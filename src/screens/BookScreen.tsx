import { View, Text, Image, TouchableOpacity, StatusBar, ImageBackground, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ShopStackParams, TBook, TRarity, TabParams } from '../types';
import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { stylesBookScreen } from './stylesScreen';
import { srcIcnCloudCry, srcIcnHeart, srcIcnRedHeart, srcImgBookHeader } from '../constants/images';
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from '@rneui/themed';
import { deepBlue } from '../constants/colors';
import { Shadow } from 'react-native-shadow-2';
import { Feather } from '@expo/vector-icons';
import { GetBook, SwitchFavorite } from '../service/api';
import { imageURL } from '../constants';
import { calculateRarity } from '../service/motivation';

type BookParams = {
	id: string;
}

export function BookScreen() {
	const { navigate: shopNavigate, goBack, getParent } = useNavigation<NavigationProp<ShopStackParams>>();
	const { navigate: tabNavigate } = useNavigation<NavigationProp<TabParams>>();
	const { id } = useRoute<RouteProp<Record<string, BookParams>, string>>().params; // get book id from params
	const [book, setBook] = useState<TBook>();
	const [bookRarity, setBookRarity] = useState<TRarity>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useFocusEffect(
		React.useCallback(() => {
			getBook();
			getParent()?.setOptions({ tabBarStyle: { display: 'flex', height: '8%' } }); //show tab bar
		}, [id])
	);

	async function getBook() {
		setIsLoading(true);
		const result = await GetBook(id);
		if (typeof result !== "number") {
			setBook(result);
			GetAndSetBookRarity(result.bookPages);
		}
		setIsLoading(false);
	}

	async function switchFavorite() {
		const result = await SwitchFavorite(id);
		if (typeof result !== "number") {
			getBook();
		}
	}

	function GetAndSetBookRarity(bookPages: number) {
		const rarity = calculateRarity(bookPages);
		setBookRarity(rarity);
	}

	return (
		<>
			{isLoading
				?
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
					<ActivityIndicator size={'large'} color={deepBlue} />
				</View>
				:
				<View style={stylesBookScreen.book_screen}>
					{!book
						?
						<View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Image style={{ width: 80, height: 80 }} source={srcIcnCloudCry} />
							<Text style={{ fontFamily: 'MontserratAlt400', fontSize: 18 }}>Книга не найдена</Text>
						</View>
						:
						<ScrollView>
							<StatusBar backgroundColor={deepBlue} />
							{/* bookScreen header */}
							<View style={stylesBookScreen.book_header}>
								<Image style={stylesBookScreen.img_header} source={srcImgBookHeader} />
								<TouchableOpacity style={stylesBookScreen.icn_back} onPress={() => goBack()}>
									<MaterialIcons name="keyboard-backspace"
										size={36}
										color="white"
									/>
								</TouchableOpacity>

								{/* Book card */}
								<View style={stylesBookScreen.container__cover_book_info}>
									<View style={stylesBookScreen.wrapper_img_cover}>
										<Shadow distance={1} startColor={bookRarity?.color} offset={[9, 9]}>
											<ImageBackground style={stylesBookScreen.img_cover} source={{ uri: imageURL + book.cover }}>
												{/* <Image style={stylesBookScreen.icn_rarity} source={srcIcnBronze} /> */}
											</ImageBackground>
										</Shadow>
									</View>
									<View style={stylesBookScreen.book_info}>
										<Text style={stylesBookScreen.title}>{book.title}</Text>
										<Text style={stylesBookScreen.author}>{book.authors}</Text>

										{/* Actions */}
										<View style={stylesBookScreen.container_all_buttons}>
											{book.isBought ?
												<Button onPress={() => tabNavigate('LibraryTab')}
													title={<Text style={stylesBookScreen.button_buy_label_bold}>Читать</Text>}
													buttonStyle={stylesBookScreen.button_buy}
													containerStyle={{ borderRadius: 8 }} />
												:
												<>
													<Button onPress={() => shopNavigate('Checkout', { book })}
														title={<Text style={stylesBookScreen.button_buy_label_bold}>Купить за
															<Text style={stylesBookScreen.button_buy_label_light}> {book.price}₽</Text></Text>}
														buttonStyle={stylesBookScreen.button_buy}
														containerStyle={{ borderRadius: 8 }} />
													<View style={stylesBookScreen.container_fav_fragment_buttons}>
														<Button onPress={switchFavorite}
															icon={
																book.isFavorite ?
																	<Image style={stylesBookScreen.img_heart} source={srcIcnRedHeart} />
																	:
																	<Image style={stylesBookScreen.img_heart} source={srcIcnHeart} />
															}
															buttonStyle={stylesBookScreen.button_fav}
															containerStyle={stylesBookScreen.button_fav_grow}
														/>
														<Button title={'Фрагмент'}
															onPress={() => shopNavigate('FragmentReader', { fragment: book.fragment })}
															titleStyle={stylesBookScreen.button_title}
															buttonStyle={stylesBookScreen.button_fragment}
															containerStyle={stylesBookScreen.button_fragment_grow}
														/>
													</View>
												</>
											}
										</View>
									</View>
								</View>
							</View>

							{/* section genres of book */}
							<View style={{ paddingLeft: 13, marginTop: 20 }}>
								<Text style={stylesBookScreen.text_header}>Жанры</Text>
								<FlatList horizontal
									showsHorizontalScrollIndicator={false}
									data={book.genres}
									renderItem={({ item }) =>
										<View style={stylesBookScreen.container_genres}>
											<Text style={stylesBookScreen.text_genres}>{item}</Text>
										</View>}
								/>
							</View>
							<Text style={stylesBookScreen.text_amount_pages}>Кол-во страниц:
								<Text style={{ fontFamily: 'MontserratAlt500' }}> {book.bookPages}</Text>
							</Text>
							{/* rarity of book */}
							<View style={{ flexDirection: 'row', marginLeft: 13, marginTop: 20 }}>
								<Feather name="info" size={24} color="#737373" />
								<Text style={stylesBookScreen.text_rarity_light}>Редкость:</Text>
								<Text style={[{ color: bookRarity?.color }, stylesBookScreen.text_rarity_bold]}> {bookRarity?.rarity}</Text>
							</View>
							{/* description of book */}
							<View style={{ marginLeft: 13, marginTop: 20, marginRight: 13 }}>
								<Text style={stylesBookScreen.text_header}>Синопсис</Text>
								<Text style={stylesBookScreen.text_description}>
									{book.description}
								</Text>
							</View>
						</ScrollView>
					}
				</View>
			}
		</>
	)
}