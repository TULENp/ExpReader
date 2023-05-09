import { View, Text, Image, ImageBackground, Button, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LibStackParams, TLibBook, TRarity } from '../../types'
import { stylesBookLibCard } from './style';
import { Shadow } from 'react-native-shadow-2';
import { deepBlue, gray, greenRarity, lightBlue, pink, purple, white } from '../../constants/colors';
import { LinearProgress } from '@rneui/themed';
import { srcIcnBook } from '../../constants/images';
import { calculateRarity } from '../../service/motivation';
import { coversDir } from '../../constants';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { checkBookIsDownloaded, deleteBook, downloadBook } from '../../service/book';

export function BookLibCard({ book }: { book: TLibBook }) {
    const { navigate } = useNavigation<NavigationProp<LibStackParams>>();
    const { authors, bookPages, cover, currentPage, id, isRead, readDate, readPages, title, fileName } = book;
    const percent = Math.floor((readPages / bookPages) * 100) || 0;
    const [bookRarity, setBookRarity] = useState<TRarity>();
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isCoverExists, setIsCoverExists] = useState(true);
    const [isLoadingBook, setIsLoadingBook] = useState(false);

    useEffect(() => {
        setBookRarity(calculateRarity(book.bookPages));
    }, [])

    useEffect(() => {
        checkDownload();
    }, [isDownloaded])

    async function checkDownload() {
        const res = await checkBookIsDownloaded(fileName);
        setIsDownloaded(res);
    }

    async function readOrDownloadBook() {
        if (isDownloaded) {
            navigate('Reader', { book })
        }
        else {
            setIsLoadingBook(true);
            const res = await downloadBook(book);
            setIsLoadingBook(false);
            setIsDownloaded(res);
        }
    }

    return (
        <Pressable onPress={readOrDownloadBook}>
            <View style={stylesBookLibCard.container_lib_book}>
                <Shadow distance={1} startColor={bookRarity?.color} offset={[7, 6]}>
                    {isCoverExists
                        ?
                        <ImageBackground style={stylesBookLibCard.cover_book} source={{ uri: coversDir + cover }}
                            onError={() => setIsCoverExists(false)} />
                        :
                        <View style={stylesBookLibCard.empty_cover_book}>
                            <Text style={stylesBookLibCard.text_empty_cover_book}>{title}</Text>
                        </View>
                    }
                </Shadow>
                <View style={stylesBookLibCard.container_info_book}>
                    <Text style={stylesBookLibCard.title}>{title}</Text>
                    <Text style={stylesBookLibCard.author}>{authors}</Text>
                    <View style={[stylesBookLibCard.btn_read, { backgroundColor: isDownloaded ? purple : deepBlue }]}>
                        {isDownloaded
                            ? <Image source={srcIcnBook} style={{ width: 14, height: 14 }} />
                            : <Feather name="download" size={14} color="white" />
                        }
                        <Text style={{ fontFamily: 'MontserratAlt500', fontSize: 12, color: white, marginLeft: 10 }}>
                            {isLoadingBook ? 'Загрузка' : isDownloaded ? 'Читать' : 'Скачать'}
                        </Text >
                    </View >
                    <Text style={stylesBookLibCard.text_progress}>{`${percent}% прочитано`}</Text>
                    <LinearProgress value={percent / 100} color={pink} style={stylesBookLibCard.progress_bar} trackColor={gray} variant='determinate' />
                    {/* <Button title='Удалить' onPress={() => deleteBook(book)} /> */}
                </View >
            </View >
        </Pressable >
    )
}