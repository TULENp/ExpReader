import { View, Text, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TBookmark, TLibBook, TRarity } from '../../types'
import { stylesBookLibCard } from './style';
import { Shadow } from 'react-native-shadow-2';
import { gray, greenRarity, pink, white } from '../../constants/colors';
import { useFonts } from 'expo-font';
import { LinearProgress } from '@rneui/themed';
import { srcIcnBook } from '../../constants/images';
import { calculateBookmark, calculateRarity } from '../../service/motivation';


export function BookLibCard({ book }: { book: TLibBook }) {
    const { author, bookPages, cover, currentPage, id, isRead, readDate, readPages, title } = book;
    const percent = Math.floor((readPages / bookPages) * 100) || 0;

    const [rarity, setRarity] = useState<TRarity>();
    const [bookmark, setBookmark] = useState<TBookmark>();

    useEffect(() => {
        setRarity(calculateRarity(bookPages));
    }, [bookPages])

    useEffect(() => {
        setBookmark(calculateBookmark(readPages, bookPages));
    }, [readPages])

    return (
        <View style={stylesBookLibCard.container_lib_book}>
            {/* <Image source={require(`../../../assets/${cover}`)}/> */}
            <Shadow distance={1} startColor={greenRarity} offset={[7, 6]}>
                <ImageBackground style={stylesBookLibCard.cover_book} source={require(`../../../assets/harryPotter3.jpg`)} />
            </Shadow>
            <View style={stylesBookLibCard.container_info_book}>
                <Text style={stylesBookLibCard.title}>{title}</Text>
                <Text style={stylesBookLibCard.author}>{author}</Text>
                <View style={stylesBookLibCard.btn_read}>
                    <Image source={srcIcnBook} style={{ width: 14, height: 14 }} />
                    <Text style={{ fontFamily: 'MontserratAlt500', fontSize: 12, color: white, marginLeft: 10 }}>Читать</Text>
                </View>
                <Text style={stylesBookLibCard.text_progress}>{`${percent}% прочитано`}</Text>
                <LinearProgress value={percent / 100} color={pink} style={stylesBookLibCard.progress_bar} trackColor={gray} variant='determinate' />
            </View>
        </View>
    )
}