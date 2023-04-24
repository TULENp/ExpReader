import { View, Text, Image } from 'react-native'
import React from 'react'
import { stylesBookShopCard } from './style'
import { TShopBook } from '../../types'
import { imageURL } from '../../constants';

export function BookShopCard({ book }: { book: TShopBook }) {
	const { id, authors, cover, title, price } = book;

	const truncateTitle = (str:string | string[], length:number) => {
		if(typeof str === 'string'){
			if (str.length >= length) {
				return str.substring(0, length) + '...';
			}
			return str;
		}else{
			if (str[0].length >= length) {
				return str[0].substring(0, length) + '...';
			}
			return str[0];
		}
	}
	return (
		<View style={stylesBookShopCard.wrapper_book_shop_card}>
			<Image style={stylesBookShopCard.img_cover} source={{ uri: imageURL + cover }} />
			<Text style={stylesBookShopCard.text_title}>{truncateTitle(title,13)}</Text>
			<Text style={stylesBookShopCard.text_author}>{truncateTitle(authors,13)}</Text>
			<Text style={stylesBookShopCard.text_price}>{price}₽</Text>
		</View>
	)
}