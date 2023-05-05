import { View, Image, ImageBackground, ImageSourcePropType, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesProfileCard } from './style'
import { Shadow } from 'react-native-shadow-2'
import { ShopStackParams, TLibBook, TRarity } from '../../types'
import { imageURL } from '../../constants'
import { calculateBookmark, calculateRarity } from '../../service/motivation'
import { useNavigation, NavigationProp } from '@react-navigation/native'

export function BookProfileCard({ book }: { book: TLibBook }) {
    const { navigate: shopNavigate } = useNavigation<NavigationProp<ShopStackParams>>();

    const [bookMark, setBookMark] = useState<ImageSourcePropType | null>(null);
    const [bookRarity, setBookRarity] = useState<TRarity>();

    useEffect(() => {
        setBookRarity(calculateRarity(book.bookPages));
    }, [])

    useEffect(() => {
        setBookMark(calculateBookmark(book.readPages, book.bookPages));
    }, [book.readPages])

    return (
        <Pressable onPress={() => shopNavigate('ShopBook', { id: book.id })}>
            <View style={stylesProfileCard.wrapper_book_profile_card}>
                <Shadow distance={1} startColor={bookRarity?.color} offset={[7, 6]}>
                    <ImageBackground style={stylesProfileCard.cover} source={{ uri: imageURL + book.cover }}>
                        {bookMark && <Image style={stylesProfileCard.icn_cover} source={bookMark} />}
                    </ImageBackground>
                </Shadow>
            </View>
        </Pressable>
    )
}