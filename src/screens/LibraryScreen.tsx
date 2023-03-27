import React, { useEffect, useState } from 'react';
import { View, Button, FlatList } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { TLibBook } from '../types';
import { clearAS, getAllFileBooksAS, saveBookStatsAS } from '../service/asyncStorage';
import { BookLibCard } from '../components/BookLibCard';
import { fileBooksDir } from '../constants';
import { useFocusEffect } from '@react-navigation/native';

export default function LibraryScreen() {
    const [fileBooks, setFileBooks] = useState<TLibBook[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            getAllFileBooks();
        }, [])
    );

    //TODO optimize this method
    // Add books from file to app dir and to local storage
    async function addBookFromFile() {
        //! //FIXME if close picker window promise will never be resolved
        const result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false,
            type: ['text/plain', 'application/x-fictionbook+xml']
        });

        if (result.type === "cancel") return;

        //* copy file to app's dir/fileBooks
        await FileSystem.StorageAccessFramework.copyAsync(
            {
                from: result.uri,
                to: fileBooksDir
            });

        const bookInit: TLibBook = {
            id: result.name,
            title: result.name,
            author: '',
            cover: '',
            bookPages: 0,
            currentPage: 1,
            readPages: 0,
            readDate: new Date(),
            isRead: false,
            fileName: result.name
        };
        //TODO don't set initBook if file already exist
        saveBookStatsAS(bookInit);
        getAllFileBooks();
    }

    async function getAllFileBooks() {
        const bookFileNames: string[] = await FileSystem.readDirectoryAsync(fileBooksDir);
        const booksArray: TLibBook[] = await getAllFileBooksAS(bookFileNames);
        setFileBooks(booksArray);
    }

    return (
        <View>
            <FlatList
                data={fileBooks}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => <BookLibCard book={item} />} />

            <Button
                title='Add book'
                onPress={addBookFromFile}
            />
            <Button
                title='get books'
                onPress={getAllFileBooks}
            />
            <Button
                title='Clear'
                onPress={clearAS}
            />
        </View>
    );
}