import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TLibBook } from '../types'
import * as FileSystem from 'expo-file-system';
import { booksDir, fileBooksDir } from '../constants';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Reader } from '../components/Reader';

type ReaderParams = {
    book: TLibBook;
}

export default function ReaderScreen() {
    const { book } = useRoute<RouteProp<Record<string, ReaderParams>, string>>().params; // get book text from params

    const [bookText, setBookText] = useState<string>('');

    useEffect(() => {
        getBookText();
    }, [])

    //TODO fix path problem
    async function getBookText() {
        let filePath = '';
        if ((await FileSystem.getInfoAsync(fileBooksDir + book.fileName)).exists) {
            filePath = fileBooksDir + book.fileName;
        }
        else {
            filePath = booksDir + book.fileName;
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