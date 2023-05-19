import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { BookShopCard } from '../components/BookShopCard'
import { srcIcnCloudCry } from '../constants/images'
import { MaterialIcons } from '@expo/vector-icons';
import { stylesFavoritesScreen } from './stylesScreen'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { ShopStackParams, TShopBook } from '../types'
import { GetFavorites } from '../service/api'
import { deepBlue } from '../constants/colors';

export function FavoritesScreen() {
	const { navigate } = useNavigation<NavigationProp<ShopStackParams>>();
	const [favorites, setFavorites] = useState<TShopBook[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const favBooksList = favorites.map((book)=> {
		return(
			<TouchableOpacity key={book.id} onPress={() => navigate('ShopBook', { id: book.id })}>
				<BookShopCard book={book} />
			</TouchableOpacity>
		)
	})


	useFocusEffect(
		React.useCallback(() => {
			getFavorites();
		}, [])
	)

	async function getFavorites() {
		setIsLoading(true);
		const result = await GetFavorites();
		if (typeof result !== "string") {
			setFavorites(result);
		}
		setIsLoading(false);
	}

	return (
		<>
			{isLoading
				?
				<View style={{width:'100%', height:'100%',backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
					<ActivityIndicator  size={'large'} color={deepBlue}/>
				</View>
				:
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
						<View style={{width:'100%', height:'100%',backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
								<Image style={{width:45, height:45}} source={srcIcnCloudCry}/>
								<Text style={{fontFamily:'MontserratAlt400', fontSize:20,textAlign:'center'}}>Вы не добавили книги в избранное</Text>
						</View>
						:
						<View style={stylesFavoritesScreen.container_books}>
							{/* <FlatList
								ItemSeparatorComponent={()=><View style={{width:8}}/>}
								style={{width:'100%'}}
								contentContainerStyle={{width:'100%', height:'100%'}}
								horizontal
								data={favorites}
								keyExtractor={(item) => item.id}
								renderItem={({ item: book }) => 
								<TouchableOpacity key={book.id} onPress={() => navigate('ShopBook', { id: book.id })}>
									<BookShopCard book={book} />
								</TouchableOpacity>	} /> */}
								{favBooksList}
						</View>
					}
				</View>
			}
		</>
		
	)
}