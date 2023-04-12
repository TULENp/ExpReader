import { View, Text, Image } from 'react-native'
import React from 'react'
import { stylesBookShopCard } from './style'
import { TShopBook } from '../../types'
import { imageURL } from '../../constants';

export function BookShopCard({ book }: { book: TShopBook }) {
	const { id, authors, cover, title, price } = book;

	const truncateTitle = (str: string) => {
		if (str.length >= 13) {
			return str.substring(0, 13) + '...';
		}
		return str;
	}

	return (
		<View style={stylesBookShopCard.wrapper_book_shop_card}>
			<Image style={stylesBookShopCard.img_cover} source={{ uri: imageURL + cover }} />
			<Text style={stylesBookShopCard.text_title}>{truncateTitle(title)}</Text>
			<Text style={stylesBookShopCard.text_author}>{authors}</Text>
			<Text style={stylesBookShopCard.text_price}>{price}₽</Text>
		</View>
	)
}