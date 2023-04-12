import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BookShopCard } from '../components/BookShopCard'
import { srcIcnBack } from '../constants/images'
import { MaterialIcons } from '@expo/vector-icons';
import { stylesFavoritesScreen } from './stylesScreen'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { ShopStackParams, TShopBook } from '../types'
import { GetFavorites } from '../service/api'

export function FavoritesScreen() {
	const { navigate } = useNavigation<NavigationProp<ShopStackParams>>();
	// const listBooks: JSX.Element[] = books.map((book) => <BookShopCard book={book} />) // Map for Rasim
	const [favorites, setFavorites] = useState<TShopBook[]>([]);

	useFocusEffect(
		React.useCallback(() => {
			getFavorites();
		}, [])
	)

	async function getFavorites() {
		const result = await GetFavorites();
		if (typeof result !== "string") {
			setFavorites(result);
		}
	}

	return (
		<View style={stylesFavoritesScreen.fav_page}>
			{/* <Image source={srcIcnBack}/> */}
			<View style={stylesFavoritesScreen.header_fav}>
				<TouchableOpacity onPress={() => navigate('Shop')} >
					<MaterialIcons name="keyboard-backspace" size={36} color="black" />
				</TouchableOpacity>
				<Text style={stylesFavoritesScreen.fav_title}>Избранное</Text>
			</View>
			{favorites.length == 0
				?
				<Text>Пусто</Text>
				:
				<View style={stylesFavoritesScreen.container_books}>
					<FlatList
						data={favorites}
						keyExtractor={(item) => item.id}
						renderItem={({ item: book }) => <BookShopCard book={book} />} />
				</View>
			}
		</View>
	)
}