import { View, Text, Image, ImageBackground, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TBookmark, TLibBook, TRarity } from '../../types'
import { stylesBookLibCard } from './style';
import { Shadow } from 'react-native-shadow-2';
import { gray, greenRarity, pink, white } from '../../constants/colors';
import { useFonts } from 'expo-font';
import { LinearProgress } from '@rneui/themed';
import { srcIcnBook } from '../../constants/images';
import { calculateBookmark, calculateRarity } from '../../service/motivation';
import { DownloadBook } from '../../service/api';
import { bookCoversDir, booksDir, fileBooksDir, imageURL } from '../../constants';
import * as FileSystem from 'expo-file-system';


export function BookLibCard({ book }: { book: TLibBook }) {
    const { authors, bookPages, cover, currentPage, id, isRead, readDate, readPages, title } = book;
    const percent = Math.floor((readPages / bookPages) * 100) || 0;

    const [rarity, setRarity] = useState<TRarity>();
    const [bookmark, setBookmark] = useState<TBookmark>();

    useEffect(() => {
        setRarity(calculateRarity(bookPages));
    }, [bookPages])

    useEffect(() => {
        setBookmark(calculateBookmark(readPages, bookPages));
    }, [readPages])

    async function downloadBook() {
        if (!(await FileSystem.getInfoAsync(booksDir)).exists) {
            await FileSystem.makeDirectoryAsync(booksDir);
        }
        const res = await DownloadBook(id);
        await FileSystem.writeAsStringAsync(booksDir + book.fileName, res);
        console.log('completed');
    }

    //TODO add path checking or set correct path
    async function deleteBook() {
        await FileSystem.deleteAsync(booksDir + book.fileName, { idempotent: true })
        console.log('deleted');
    }

    async function downloadBookCover() {
        if (!(await FileSystem.getInfoAsync(bookCoversDir)).exists) {
            await FileSystem.makeDirectoryAsync(bookCoversDir);
        }
        await FileSystem.downloadAsync(imageURL + book.cover, bookCoversDir + book.cover)
        console.log('cover downloaded');
    }

    return (
        <View style={stylesBookLibCard.container_lib_book}>
            {/* <Image source={require(`../../../assets/${cover}`)}/> */}
            <Shadow distance={1} startColor={greenRarity} offset={[7, 6]}>
                <ImageBackground style={stylesBookLibCard.cover_book} source={{ uri: bookCoversDir + book.cover }} />
            </Shadow>
            <View style={stylesBookLibCard.container_info_book}>
                <Text style={stylesBookLibCard.title}>{title}</Text>
                <Text style={stylesBookLibCard.author}>{authors}</Text>
                <View style={stylesBookLibCard.btn_read}>
                    <Image source={srcIcnBook} style={{ width: 14, height: 14 }} />
                    <Text style={{ fontFamily: 'MontserratAlt500', fontSize: 12, color: white, marginLeft: 10 }}>Читать</Text>
                </View>
                <Text style={stylesBookLibCard.text_progress}>{`${percent}% прочитано`}</Text>
                <LinearProgress value={percent / 100} color={pink} style={stylesBookLibCard.progress_bar} trackColor={gray} variant='determinate' />
                <Button title='Скачать' onPress={downloadBook} />
                <Button title='Удалить' onPress={deleteBook} />
                <Button title='Скачать обложку' onPress={downloadBookCover} />
            </View>
        </View>
    )
}