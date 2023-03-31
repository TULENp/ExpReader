import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StatusBar, Image, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { TLibBook } from '../types';
import { clearStorage, getFileBooksFromStorage, saveFileBooksToStorage } from '../service/asyncStorage';
import { BookLibCard } from '../components/BookLibCard';
import { stylesLibraryScreen } from './stylesScreen';
import { srcImgLibraryHeader } from '../constants/images';
import { } from 'react-native-elements';
import { ButtonGroup, FAB, Input, ListItem } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, } from '@expo-google-fonts/montserrat'
import { MontserratAlternates_300Light, MontserratAlternates_400Regular,MontserratAlternates_500Medium,MontserratAlternates_700Bold,} from '@expo-google-fonts/montserrat-alternates'
import AppLoading from 'expo-app-loading';
import { black, deepBlue, gray, pink, white } from '../constants/colors';
import { BookReadLaterCard } from '../components/BookReadLaterCard/BookReadLaterCard';
import { books } from '../TestData/books';


export default function LibraryScreen() {
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

    //TODO fix TS navigation error
    const fileBooksDir = FileSystem.documentDirectory + 'fileBooks/'; // directory for books added from file
    const { navigate } = useNavigation();
    const [fileBooks, setFileBooks] = useState<TLibBook[]>([]);

    

    const [searchText, setSearchText] = useState<string>('');
    const [libCategory, setLibCategory] = useState<number>(0);

    useEffect(() => {
        getAllFileBooks();
    }, [])

    async function readText(filePath: string) {
        return await FileSystem.StorageAccessFramework.readAsStringAsync(filePath)
    }

    //TODO optimize this method
    // Add books from file to app dir and to local storage
    async function AddFromFile() {
        const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false, type: 'text/txt' });

        if (result.type === "success" && FileSystem.documentDirectory) {
            //* copy file to app's dir/fileBooks
            await FileSystem.StorageAccessFramework.copyAsync(
                {
                    from: result.uri,
                    to: fileBooksDir
                });

            // const text = await readText(fileBooksDir + result.name);
            // alert(Math.ceil(text.length / 600));
            const bookInit: TLibBook = {
                id: 0,
                title: result.name,
                author: '',
                cover: '',
                bookPages: 0,
                currentPage: 0,
                readPages: 0,
                readDate: new Date(),
                isRead: false
            };
            saveFileBooksToStorage(bookInit);
        }
    }

    async function getAllFileBooks() {
        const bookFileNames: string[] = await FileSystem.readDirectoryAsync(fileBooksDir);

        const books = await getFileBooksFromStorage(bookFileNames);
        setFileBooks(books);
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <>
        <FlatList ListHeaderComponent={
          <>
            <KeyboardAvoidingView behavior='height' style={stylesLibraryScreen.lib_page}>
                <StatusBar backgroundColor = {deepBlue} />
                <ImageBackground source={srcImgLibraryHeader} style={stylesLibraryScreen.container_header}>
                    <View style={stylesLibraryScreen.container_search_input}>
                        <Input onChangeText={text => setSearchText(text)}
                            placeholder={'Найти книги'}
                            inputContainerStyle={{borderBottomWidth:0 }}
                            leftIcon={{ type: 'octicons', name: 'search' }}
                            style={[stylesLibraryScreen.search_input, {fontFamily: 'MontserratAlt400'}]}/>
                    </View>
                </ImageBackground>
                <BookReadLaterCard/>
                <View style={{paddingTop:25, paddingBottom:20}}>
                    <Text style={stylesLibraryScreen.h1_library}>Библиотека</Text>
                    <ButtonGroup buttons={['Купленные книги','Добавленные книги']}
                                 selectedIndex={libCategory}
                                 onPress={(value) => {
                                    setLibCategory(value);
                                  }}
                                 containerStyle={stylesLibraryScreen.button_group_containerStyle}
                                 textStyle={stylesLibraryScreen.button_group_textStyle}
                                 buttonContainerStyle={{}}
                                 selectedButtonStyle={{backgroundColor:deepBlue}}
                                 buttonStyle={{}}
                                 />            
                </View>
                </KeyboardAvoidingView>
            </> } 
                data={libCategory === 0 ? books : fileBooks}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => {
                    return(
                        <View style={{backgroundColor:white}}>
                            <BookLibCard book={item} />
                        </View>)}}
                ListFooterComponent={
                  <>
                  <View style={{flex:1}}>
                  
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
                  </>} />
                  <FAB icon={{ name: 'add', color: 'white' }} color={deepBlue} size='large' style={stylesLibraryScreen.fab_button}/>
        </>
    );
}