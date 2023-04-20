import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StatusBar, KeyboardAvoidingView, ImageBackground, Pressable, Image } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { LibStackParams, TLibBook } from '../types';
import { getAllBooksAS, getBookNamesAS, setBookStatsAS } from '../service/asyncStorage';
import { BookLibCard } from '../components/BookLibCard';
import { stylesLibraryScreen } from './stylesScreen';
import { srcIcnCloudCry, srcImgLibraryHeader } from '../constants/images';
import { ButtonGroup, FAB, Input, ListItem } from '@rneui/themed';
import { black, deepBlue, gray, pink, white } from '../constants/colors';
import { BookLastReadCard } from '../components/BookLastReadCard';
import { fileBooksDir } from '../constants';
import { AppContext } from '../context/AppContext';
import { ScrollView } from 'react-native-gesture-handler';

export function LibraryScreen() {
    const { isGotBackend } = useContext(AppContext);
    const { navigate, getParent } = useNavigation<NavigationProp<LibStackParams>>();
    const [fileBooks, setFileBooks] = useState<TLibBook[]>([]);
    const [shopBooks, setShopBooks] = useState<TLibBook[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [libCategory, setLibCategory] = useState<number>(0);

    useFocusEffect(
        React.useCallback(() => {
            getAllFileBooks();
            //get data from AS only after getting data from backend
            if (isGotBackend) {
                getAllLibBooks();
            }
            getParent()?.setOptions({ tabBarStyle: { display: 'flex', height: '8%' } }); //show tab bar
        }, [isGotBackend])
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
                //TODO mb change to `${booksDir}/${result.name}`
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
        await setBookStatsAS(bookInit);
        getAllFileBooks();
        setLibCategory(1);
    }

    async function getAllFileBooks() {
        const bookFileNames: string[] = await FileSystem.readDirectoryAsync(fileBooksDir);
        const booksArray: TLibBook[] = await getAllBooksAS(bookFileNames);
        setFileBooks(booksArray);
    }
    
//TODO add loading
    async function getAllLibBooks() {
        //loading true
        const bookNames = await getBookNamesAS();
        const booksArray = await getAllBooksAS(bookNames);
        setShopBooks(booksArray);
        //loading false
    }

    function BooksList() {
        let data = [];
        if (searchText) {
            const allBooks = shopBooks.concat(fileBooks);
            data = allBooks.filter(book => book.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
        }
        else {
            data = libCategory === 0 ? shopBooks.slice(1) : fileBooks;
        }
        const list = data.map((book) => {
            return (
                <View key={book.id} style={{ backgroundColor: white }}>
                    <BookLibCard book={book} />
                </View>)
        })
        //TODO change styles add margin or smth
        return (
            <>
                {searchText && data.length === 0
                    ?
                    <Text>Книги не найдены</Text>
                    :
                    !searchText && data.length === 0
                        ?
                        <View style={{ alignItems: 'center', padding: 13, flex: 1, justifyContent: 'center' }}>
                            <Image style={{ width: 55, height: 55 }} source={srcIcnCloudCry} />
                            <Text style={stylesLibraryScreen.text_empty_list}>
                                {libCategory === 0 ? 'Вы ещё не приобрели ни одной книги' : 'Вы ещё не добавили ни одной книги'}
                            </Text>
                        </View>
                        :
                        list
                }
            </>
        )
    }

    return (
        <>
            <ScrollView style={{backgroundColor:'white', flex:1}}>
                <KeyboardAvoidingView behavior='height' style={stylesLibraryScreen.lib_page}>
                    <StatusBar backgroundColor={deepBlue} />
                    {/* SearchBar */}
                    <ImageBackground source={srcImgLibraryHeader} style={stylesLibraryScreen.container_header}>
                        <View style={stylesLibraryScreen.container_search_input}>
                            <Input onChangeText={text => setSearchText(text)}
                                placeholder={'Найти книги'}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                leftIcon={{ type: 'octicons', name: 'search' }}
                                style={[stylesLibraryScreen.search_input, { fontFamily: 'MontserratAlt400' }]} />
                        </View>
                    </ImageBackground>
                    {!searchText &&
                        <>
                            {/* LastReadBook card */}
                            {shopBooks[0] && libCategory === 0 &&
                                <Pressable onPress={() => navigate('Reader', { book: shopBooks[0] })}>
                                    <BookLastReadCard book={shopBooks[0]} />
                                </Pressable>}
                            {/* Tabs */}
                            <View style={{ paddingTop: 25, }}>
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
                        </>
                    }
                </KeyboardAvoidingView>
                {/* List of books */}
                <View style={{marginTop:20}}>
                    <BooksList />
                </View>
            </ScrollView>
            {/* add book button */}
            <FAB onPress={addBookFromFile}
                icon={{ name: 'add', color: 'white' }}
                color={deepBlue} size='large'
                style={stylesLibraryScreen.fab_button} />
        </>
    );
}