import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { TLibBook } from '../types';
import { clearStorage, getFileBooksFromStorage, saveFileBooksToStorage } from '../service/asyncStorage';
import { BookLibCard } from '../components/BookLibCard';
import { fileBooksDir } from '../constants';


export default function LibraryScreen() {
    //TODO fix TS navigation error
    // const fileBooksDir = FileSystem.documentDirectory + 'fileBooks/'; // directory for books added from file
    const [fileBooks, setFileBooks] = useState<TLibBook[]>([]);

    useEffect(() => {
        getAllFileBooks();
    }, [])

    //TODO optimize this method
    // Add books from file to app dir and to local storage
    async function AddFromFile() {
        //FIXME if close picker window promise will never be resolved
        try {
            const result = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: false,
                type: ['text/plain', 'application/x-fictionbook+xml']
            });

            if (result.type === "success") {
                //* copy file to app's dir/fileBooks
                await FileSystem.StorageAccessFramework.copyAsync(
                    {
                        from: result.uri,
                        to: fileBooksDir
                    });

                // const text = await readText(fileBooksDir + result.name);
                // alert(Math.ceil(text.length / 600));
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
                saveFileBooksToStorage(bookInit);
            }
        } catch (e) {
            //@ts-ignore
            console.log('Something went wrong: ' + e.message);
        }
    }


    async function getAllFileBooks() {
        const bookFileNames: string[] = await FileSystem.readDirectoryAsync(fileBooksDir);

        const books = await getFileBooksFromStorage(bookFileNames);
        setFileBooks(books);
    }

    return (
        <View>
            <FlatList
                data={fileBooks}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => <BookLibCard book={item} />} />

            <Button
                title='Add book'
                onPress={AddFromFile}
            />
            <Button
                title='get books'
                onPress={getAllFileBooks}
            />
            <Button
                title='Clear'
                onPress={clearStorage}
            />
        </View>
    );
}