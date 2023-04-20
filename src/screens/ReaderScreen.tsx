import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LibStackParams, TLibBook } from '../types'
import * as FileSystem from 'expo-file-system';
import { booksDir, fileBooksDir } from '../constants';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { Reader } from '../components/Reader';

type ReaderParams = {
    book: TLibBook;
}

export function ReaderScreen() {
    const { book } = useRoute<RouteProp<Record<string, ReaderParams>, string>>().params; // get book text from params

    const { navigate, getParent } = useNavigation<NavigationProp<LibStackParams>>();

    const [bookText, setBookText] = useState<string>('');

    useEffect(() => {
        getBookText();
        getParent()?.setOptions({tabBarStyle: {display: 'none'}}); //hide tab bar
        
    }, [])

    async function getBookText() {
        let filePath = '';
        if ((await FileSystem.getInfoAsync(booksDir + book.fileName)).exists) {
            filePath = booksDir + book.fileName;
        }
        else {
            filePath = fileBooksDir + book.fileName;
        }

        await FileSystem.StorageAccessFramework.readAsStringAsync(filePath)
            .then(text => readFB2(text))
            .then(text => setBookText(text));
    }

    //Remove fb2 tags to make it look like the file was read correctly
    function readFB2(text: string) {
        const regex = /<[^>]+>/g;
        return text.replace(regex, '');
    }

    return (
        <>
            {
                bookText == ''
                    ? <Text>Загрузка...</Text>
                    : <Reader bookText={bookText} book={book} />
            }
        </>
    )
}