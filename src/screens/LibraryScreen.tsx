import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StatusBar, Image, KeyboardAvoidingView, ImageBackground, Pressable } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { LibStackParams, TLibBook, TShopBook } from '../types';
import { clearAS, getAllBooksAS, getBookNamesAS, getTokenAS, setBookStatsAS } from '../service/asyncStorage';
import { BookLibCard } from '../components/BookLibCard';
import { stylesLibraryScreen } from './stylesScreen';
import { srcImgLibraryHeader } from '../constants/images';
import { ButtonGroup, FAB, Input, ListItem } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, } from '@expo-google-fonts/montserrat'
import { MontserratAlternates_300Light, MontserratAlternates_400Regular, MontserratAlternates_500Medium, MontserratAlternates_700Bold, } from '@expo-google-fonts/montserrat-alternates'
import AppLoading from 'expo-app-loading';
import { black, deepBlue, gray, pink, white } from '../constants/colors';
import { BookLastReadCard } from '../components/BookLastReadCard';
import { booksDir, fileBooksDir } from '../constants';


export function LibraryScreen() {
    let [fontsLoaded] = useFonts({
        'Montserrat300': Montserrat_300Light,
        'Montserrat400': Montserrat_400Regular,
        'Montserrat500': Montserrat_500Medium,
        'Montserrat700': Montserrat_700Bold,
        'MontserratAlt300': MontserratAlternates_300Light,
        'MontserratAlt400': MontserratAlternates_400Regular,
        'MontserratAlt500': MontserratAlternates_500Medium,
        'MontserratAlt700': MontserratAlternates_700Bold,
    })

    const { navigate } = useNavigation<NavigationProp<LibStackParams>>();
    const [fileBooks, setFileBooks] = useState<TLibBook[]>([]);
    const [shopBooks, setShopBooks] = useState<TLibBook[]>([]);

    const [searchText, setSearchText] = useState<string>('');
    const [libCategory, setLibCategory] = useState<number>(0);

    useFocusEffect(
        React.useCallback(() => {
            getAllFileBooks();
            getAllShopBooks();
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
            authors: [],
            cover: '',
            bookPages: 0,
            currentPage: 1,
            readPages: 0,
            readDate: new Date(),
            isRead: false,
            fileName: result.name
        };
        //TODO don't set initBook if file already exist
        setBookStatsAS(bookInit);
        getAllFileBooks();
    }

    async function getAllFileBooks() {
        const bookFileNames: string[] = await FileSystem.readDirectoryAsync(fileBooksDir);
        const booksArray: TLibBook[] = await getAllBooksAS(bookFileNames);
        setFileBooks(booksArray);
    }

    //TODO check book isDownloaded (readDirectoryAsync)
    async function getAllShopBooks() {
        const bookNames = await getBookNamesAS();
        const booksArray: TLibBook[] = await getAllBooksAS(bookNames);
        setShopBooks(booksArray);
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <>
            <FlatList
                ListHeaderComponent=
                {
                    <>
                        <KeyboardAvoidingView behavior='height' style={stylesLibraryScreen.lib_page}>
                            <StatusBar backgroundColor={deepBlue} />
                            <ImageBackground source={srcImgLibraryHeader} style={stylesLibraryScreen.container_header}>
                                <View style={stylesLibraryScreen.container_search_input}>
                                    <Input onChangeText={text => setSearchText(text)}
                                        placeholder={'Найти книги'}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        leftIcon={{ type: 'octicons', name: 'search' }}
                                        style={[stylesLibraryScreen.search_input, { fontFamily: 'MontserratAlt400' }]} />
                                </View>
                            </ImageBackground>

                            <Pressable onPress={() => navigate('Reader', { book: shopBooks[0] })}>
                                <BookLastReadCard book={shopBooks[0]} />
                            </Pressable>

                            <View style={{ paddingTop: 25, paddingBottom: 20 }}>
                                <Text style={stylesLibraryScreen.h1_library}>Библиотека</Text>
                                <ButtonGroup buttons={['Купленные книги', 'Добавленные книги']}
                                    selectedIndex={libCategory}
                                    onPress={(value) => {
                                        setLibCategory(value);
                                    }}
                                    containerStyle={stylesLibraryScreen.button_group_containerStyle}
                                    textStyle={stylesLibraryScreen.button_group_textStyle}
                                    buttonContainerStyle={{}}
                                    selectedButtonStyle={{ backgroundColor: deepBlue }}
                                    buttonStyle={{}}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </>
                }
                data={libCategory === 0 ? shopBooks : fileBooks}
                keyExtractor={(item) => item.title}
                renderItem={({ item: book }) => {
                    return (
                        <View style={{ backgroundColor: white }}>
                                <BookLibCard book={book} />
                        </View>)
                }}
                ListFooterComponent={
                    <>
                        <View style={{ flex: 1 }}>
                            {/* //! Test func */}
                            <Button title='get books' onPress={getAllFileBooks} />
                            {/* <Button title='Clear' onPress={clearAS} /> */}
                            {/* //! Test func */}
                        </View>
                    </>} />
            <FAB onPress={addBookFromFile}
                icon={{ name: 'add', color: 'white' }}
                color={deepBlue} size='large'
                style={stylesLibraryScreen.fab_button} />
        </>
    );
}