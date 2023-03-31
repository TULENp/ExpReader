import { View, Text, Image } from 'react-native'
import React from 'react'
import { stylesBookShopCard } from './style'
import { TAllBook, TShopBook } from '../../types'

export function BookShopCard({book}: {book:TAllBook}) {
    const {id,author,cover,title,price} = book;
    return (
        <View style={stylesBookShopCard.wrapper_book_shop_card}>
            <Image style={stylesBookShopCard.img_cover} source={require(`../../../assets/harryPotter3.jpg`)}/>
            <Text style={stylesBookShopCard.text_title}>{title}</Text>
            <Text style={stylesBookShopCard.text_author}>{author}</Text>
            <Text style={stylesBookShopCard.text_price}>{price}₽</Text>
        </View>
    )
}