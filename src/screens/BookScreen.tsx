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
import { GetBook, SwitchFavorite } from '../service/api';
import { imageURL } from '../constants';

type BookParams = {
	id: string;
}

export function BookScreen() {

	const width = Dimensions.get('window').width;

	const [colorRarity, setColorRarity] = useState<string>('');
	const [bookRarity, setBookRarity] = useState<string>('');
	
	const { navigate, goBack } = useNavigation<NavigationProp<ShopStackParams>>();
	const { id } = useRoute<RouteProp<Record<string, BookParams>, string>>().params; // get book id from params
	const [book, setBook] = useState<TBook>();
	// const [isFav, setIsFav] = useState(book?.isFavorite);

	useEffect(() => {
		getBook();
	}, [id])

	async function getBook() {
		const result = await GetBook(id);
		if (typeof result !== "string") {
			setBook(result);
		}
	}

	async function switchFavorite() {
		const result = await SwitchFavorite(id);

		//TODO update screen if successful
		// if (typeof result !== "string") {
		// }
	}

	//TODO add Loading

	const GetRarityOfBook = (bookPages: number): string => {
		if (bookPages <= 250) {
			setColorRarity(greenRarity)
			return 'обычная'
		};
		if ((bookPages > 250) && (bookPages <= 650)) {
			setColorRarity(blueRarity)
			return 'редкая'
		}
		if ((bookPages > 650) && (bookPages <= 950)) {
			setColorRarity(redRarity)
			return 'эпическая'
		}
		if (bookPages > 950) {
			setColorRarity(yellowRarity)
			return 'легендарная'
		}
		return ''
	}

	useEffect(() => {
		if (book) {
			setBookRarity(GetRarityOfBook(book.bookPages))
		}
	}, []);

	return (
		<>
			<View style={stylesBookScreen.book_screen}>
				{!book
					?
					<Text>Книги нет</Text>
					:
					<ScrollView>
						<StatusBar backgroundColor={deepBlue} />
						{/* bookScreen header */}
						<View style={stylesBookScreen.book_header}>
							<Image style={stylesBookScreen.img_header} source={srcImgBookHeader} />
							<TouchableOpacity style={stylesBookScreen.icn_back}
								onPress={() => goBack()}
							>
								<MaterialIcons name="keyboard-backspace"
									size={36}
									color="white"
								/>
							</TouchableOpacity>

							{/* Book card */}
							<View style={stylesBookScreen.container__cover_book_info}>
								<View style={stylesBookScreen.wrapper_img_cover}>
									<Shadow distance={1} startColor={colorRarity} offset={[9, 9]}>
										<ImageBackground style={stylesBookScreen.img_cover} source={{ uri: imageURL + book.cover }}>
											<Image style={stylesBookScreen.icn_rarity} source={srcIcnBronze} />
										</ImageBackground>
									</Shadow>
								</View>
								<View style={stylesBookScreen.book_info}>
									<Text style={stylesBookScreen.title}>{book.title}</Text>
									<Text style={stylesBookScreen.author}>{book.authors}</Text>

									{/* Actions */}
									<View style={stylesBookScreen.container_all_buttons}>
										<Button title={<Text style={stylesBookScreen.button_buy_label_bold}
											onPress={() => navigate('Checkout', { book })}
										>Купить за
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
												titleStyle={stylesBookScreen.button_title}
												buttonStyle={stylesBookScreen.button_fragment}
												containerStyle={stylesBookScreen.button_fragment_grow}
											/>
										</View>
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
							<Text style={[{ color: colorRarity }, stylesBookScreen.text_rarity_bold]}> {bookRarity}</Text>
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
		</>
	)
}