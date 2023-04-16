import { View, Text, Image, ImageBackground, ImageSourcePropType } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesProfileCard } from './style'
import { Shadow } from 'react-native-shadow-2'
import { greenRarity } from '../../constants/colors'
import { TLibBook, TRarity } from '../../types'
import { imageURL } from '../../constants'
import { calculateBookmark, calculateRarity } from '../../service/motivation'

export function BookProfileCard({ book }: { book: TLibBook }) {
    const [bookMark, setBookMark] = useState<ImageSourcePropType | null>(null);
    const [bookRarity, setBookRarity] = useState<TRarity>();

    useEffect(() => {
        setBookMark(calculateBookmark(book.readPages, book.bookPages));
        setBookRarity(calculateRarity(book.bookPages));
    }, [])

    return (
        <View style={stylesProfileCard.wrapper_book_profile_card}>
            <Shadow distance={1} startColor={bookRarity?.color} offset={[7, 6]}>
                <ImageBackground style={stylesProfileCard.cover} source={{ uri: imageURL + book.cover }}>
                    {bookMark && <Image style={stylesProfileCard.icn_cover} source={bookMark} />}
                </ImageBackground>
            </Shadow>
        </View>
    )
}