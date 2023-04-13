import { View, Text, Image, ImageBackground, Button, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LibStackParams, TBookmark, TLibBook, TRarity } from '../../types'
import { stylesBookLibCard } from './style';
import { Shadow } from 'react-native-shadow-2';
import { gray, greenRarity, pink, white } from '../../constants/colors';
import { LinearProgress } from '@rneui/themed';
import { srcIcnBook } from '../../constants/images';
import { calculateBookmark, calculateRarity } from '../../service/motivation';
import { DownloadBook } from '../../service/api';
import { coversDir, booksDir, fileBooksDir, imageURL } from '../../constants';
import * as FileSystem from 'expo-file-system';
import { useNavigation, NavigationProp } from '@react-navigation/native';


export function BookLibCard({ book }: { book: TLibBook }) {
    const { navigate } = useNavigation<NavigationProp<LibStackParams>>();
    const { authors, bookPages, cover, currentPage, id, isRead, readDate, readPages, title, fileName } = book;
    const percent = Math.floor((readPages / bookPages) * 100) || 0;

    const [rarity, setRarity] = useState<TRarity>();
    const [bookmark, setBookmark] = useState<TBookmark>();
    const [isDownloaded, setIsDownloaded] = useState(false);

    useEffect(() => {
        checkDownload();
    }, [])

    async function checkDownload() {
        const shopBooks: string[] = await FileSystem.readDirectoryAsync(booksDir);
        const fileBooks: string[] = await FileSystem.readDirectoryAsync(fileBooksDir);
        const bookNames = shopBooks.concat(fileBooks);
        if (bookNames.includes(fileName)) {
            setIsDownloaded(true);
        }
    }

    useEffect(() => {
        setRarity(calculateRarity(bookPages));
    }, [bookPages])

    useEffect(() => {
        setBookmark(calculateBookmark(readPages, bookPages));
    }, [readPages])

    //TODO add download loading
    async function downloadBook() {
        const res = await DownloadBook(id);
        await FileSystem.writeAsStringAsync(booksDir + fileName, res);
        await FileSystem.downloadAsync(imageURL + cover, coversDir + cover);
        setIsDownloaded(true);
    }

    async function deleteBook() {
        await FileSystem.deleteAsync(booksDir + fileName, { idempotent: true })
        console.log('deleted');
    }

    function readOrDownloadBook() {
        if (isDownloaded) {
            navigate('Reader', { book })
        }
        else {
            downloadBook();
        }
    }

    return (
        <Pressable onPress={readOrDownloadBook}>
            <View style={stylesBookLibCard.container_lib_book}>
                {/* <Image source={require(`../../../assets/${cover}`)}/> */}
                <Shadow distance={1} startColor={greenRarity} offset={[7, 6]}>
                    <ImageBackground style={stylesBookLibCard.cover_book} source={{ uri: coversDir + cover }} />
                </Shadow>
                <View style={stylesBookLibCard.container_info_book}>
                    <Text style={stylesBookLibCard.title}>{title}</Text>
                    <Text style={stylesBookLibCard.author}>{authors}</Text>
                    <View style={stylesBookLibCard.btn_read}>
                        <Image source={srcIcnBook} style={{ width: 14, height: 14 }} />
                        <Text style={{ fontFamily: 'MontserratAlt500', fontSize: 12, color: white, marginLeft: 10 }}>{isDownloaded ? 'Читать' : 'Скачать'}</Text>
                    </View>
                    <Text style={stylesBookLibCard.text_progress}>{`${percent}% прочитано`}</Text>
                    <LinearProgress value={percent / 100} color={pink} style={stylesBookLibCard.progress_bar} trackColor={gray} variant='determinate' />
                    <Button title='Удалить' onPress={deleteBook} />
                </View>
            </View>
        </Pressable>
    )
}