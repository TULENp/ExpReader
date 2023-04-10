import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { srcIcnSilver, srcImgHarryPotter3 } from '../../constants/images'
import { stylesProfileCard } from './style'
import { Shadow } from 'react-native-shadow-2'
import { greenRarity } from '../../constants/colors'
import { TLibBook } from '../../types'
import { imageURL } from '../../constants'

export function BookProfileCard({ book }: { book: TLibBook }) {
    return (
        <View style={stylesProfileCard.wrapper_book_profile_card}>
            <Shadow distance={1} startColor={greenRarity} offset={[7, 6]}>
                <ImageBackground style={stylesProfileCard.cover} source={{ uri: imageURL + book.cover }}>
                    <Image style={stylesProfileCard.icn_cover} source={srcIcnSilver} />
                </ImageBackground>
            </Shadow>
        </View>
    )
}