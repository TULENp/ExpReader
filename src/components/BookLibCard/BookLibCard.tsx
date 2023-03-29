import { View, Text, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { TLibBook } from '../../types'
import { stylesBookLibCard } from './style';
import { Shadow } from 'react-native-shadow-2';
import { gray, greenRarity, pink, white } from '../../constants/colors';
import { useFonts } from 'expo-font';
import { LinearProgress } from '@rneui/themed';
import { srcIcnBook } from '../../constants/images';


export function BookLibCard({ book }: { book: TLibBook }) {
    // 
    const { author, bookPages, cover, currentPage, id, isRead, readDate, readPages, title } = book;
    
    return (
        <View style={stylesBookLibCard.container_lib_book}>
            {/* <Image source={require(`../../../assets/${cover}`)}/> */}
            <Shadow distance={1} startColor={greenRarity} offset={[7, 6]}>
                <ImageBackground style={stylesBookLibCard.cover_book} source={require(`../../../assets/harryPotter3.jpg`)}/>
            </Shadow>
            <View style={stylesBookLibCard.container_info_book}>
                <Text style={stylesBookLibCard.title}>{title}</Text>
                <Text style={stylesBookLibCard.author}>{author}</Text>
                <View style={stylesBookLibCard.btn_read}>
                    <Image source={srcIcnBook} style={{width:14,height:14}}/>
                    <Text style={{fontFamily:'MontserratAlt500', fontSize:12, color:white, marginLeft:10}}>Читать</Text>
                </View>
                <Text style={stylesBookLibCard.text_progress}>{`${readPages/bookPages}% прочитано`}</Text>
                <LinearProgress value={readPages/bookPages} color={pink} style={stylesBookLibCard.progress_bar}  trackColor={gray} variant='determinate'/>
            </View>
        </View>
    )
}