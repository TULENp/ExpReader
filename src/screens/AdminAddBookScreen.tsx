import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { stylesAdminScreen } from './stylesScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { blueRarity, deepBlue, gray, greenRarity, purple, redRarity } from '../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { stylesFilters } from '../components/Filters/style';

interface Book {
    title: string;
    price: number;
    description: string;
    excerpt: string;
}

export function AdminAddBookScreen() {
    const [book, setBook] = useState<Book>({
        title: '',
        price: 0,
        description: '',
        excerpt: '',
    });

    const [coverImage, setCoverImage] = useState<{ uri: string } | null>(null);
    const [bookFile, setBookFile] = useState<DocumentPicker.DocumentResult | null>(null);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [valueAuthor, setValueAuthor] = useState();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [valueGenre, setValueGenre] = useState();

    const authorsList = [
        { label: 'Федор Достоевский', value: 0 },
        { label: 'Виктор Пелевин', value: 1 },
        { label: 'Эрнест Миллер Хемингуэй', value: 2 },
        { label: 'Александр Дюма', value: 3 },
        { label: 'Владимир Набоков', value: 4 },
        { label: 'Михаил Лермонтов', value: 5 },
        { label: 'Джоан Роулинг', value: 6 },
        { label: 'Кэтрин Ласки', value: 7 },
    ]

    const genresList = [
        { label: 'Фантастика', value: 0 },
        { label: 'Приключения', value: 1 },
        { label: 'Фэнтези', value: 2 },
        { label: 'Классика', value: 3 },
        { label: 'Роман', value: 4 },
        { label: 'Поэзия', value: 5 },
        { label: 'Хоррор', value: 6 },
        { label: 'Нон-Фикшн', value: 7 },
        { label: 'Комедия', value: 7 },
        { label: 'Исторический роман', value: 7 },
        { label: 'Детектив', value: 7 },
        { label: 'Детские книги', value: 7 },
    ]

    const handlePickCoverImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [7, 10],
            quality: 1,
            allowsMultipleSelection: false
        });

        if (!result.canceled) {
            setCoverImage(result.assets[0]);
        }
    };

    const handlePickBookFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ["text/plain", "application/x-fictionbook+xml"],
            copyToCacheDirectory: false,
        });

        if (result.type === 'success') {
            setBookFile(result);
        }
    };

    //TODO Add feedback
    const handleAddBook = () => {
        // TODO Implement logic for adding book to database or server
        console.log(book);
        console.log(coverImage);
        console.log(bookFile);
    };

    function addAuthor(author: string) {
        if (selectedAuthors.includes(author)) {
            alert('Такой автор уже есть');
            return;
        }
        setSelectedAuthors([...selectedAuthors, author]);
    }

    function removeAuthor(author: string) {
        setSelectedAuthors(selectedAuthors.filter(item => item !== author))
    }

    function addGenre(genre: string) {
        if (selectedGenres.includes(genre)) {
            alert('Такой жанр уже есть');
            return;
        }
        setSelectedGenres([...selectedGenres, genre]);
    }

    function removeGenre(genre: string) {
        setSelectedGenres(selectedGenres.filter(item => item !== genre))
    }

    const renderSelectedAuthors: JSX.Element[] = selectedAuthors.map((author, index) => {
        return (
            <View style={styles.list_container}>
                <Text style={styles.author}>{author}</Text>
                <TouchableOpacity style={[{ backgroundColor: redRarity, padding: 8, borderRadius: 5 }]} onPress={() => removeAuthor(author)}>
                    <Text style={[stylesAdminScreen.standard_btn_text, { fontFamily: 'MontserratAlt700', fontSize: 14 }]}>Удалить</Text>
                </TouchableOpacity>
            </View>
        )
    })

    const renderSelectedGenres: JSX.Element[] = selectedGenres.map((genre, index) => {
        return (
            <View style={styles.list_container}>
                <Text style={styles.author}>{genre}</Text>
                <TouchableOpacity style={[{ backgroundColor: redRarity, padding: 8, borderRadius: 5 }]} onPress={() => removeGenre(genre)}>
                    <Text style={[stylesAdminScreen.standard_btn_text, { fontFamily: 'MontserratAlt700', fontSize: 14 }]}>Удалить</Text>
                </TouchableOpacity>
            </View>
        )
    })

    //TODO add author and genres picker 
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
                <View>
                    <Text style={stylesAdminScreen.text_h2}>Название</Text>
                    <TextInput
                        style={styles.input}
                        value={book.title}
                        onChangeText={(text) => setBook({ ...book, title: text })}
                    />
                </View>
                <View >
                    <Text style={[stylesAdminScreen.text_h2, { marginBottom: 10 }]}>Авторы</Text>
                    <Dropdown data={authorsList}
                        mode='modal'
                        maxHeight={300}
                        style={stylesFilters.select}
                        fontFamily='MontserratAlt700'
                        placeholderStyle={{ color: 'white' }}
                        selectedTextStyle={{ color: 'white' }}
                        activeColor={greenRarity}
                        itemContainerStyle={{ borderRadius: 8 }}
                        containerStyle={{ borderRadius: 8 }}
                        iconColor='white'
                        placeholder='Выбрать'
                        labelField={'label'}
                        valueField={'value'}
                        value={valueAuthor}
                        onChange={(item) => addAuthor(item.label)
                        } />
                    <View style={{ width: '100%', marginTop: 10 }}>
                        {renderSelectedAuthors}
                    </View>
                </View>
                <View>
                    <Text style={[stylesAdminScreen.text_h2, { marginBottom: 10 }]}>Жанры</Text>
                    <Dropdown data={genresList}
                        mode='modal'
                        maxHeight={300}
                        style={[stylesFilters.select, { backgroundColor: blueRarity }]}
                        fontFamily='MontserratAlt700'
                        placeholderStyle={{ color: 'white' }}
                        selectedTextStyle={{ color: 'white' }}
                        activeColor={blueRarity}
                        itemContainerStyle={{ borderRadius: 8 }}
                        containerStyle={{ borderRadius: 8 }}
                        iconColor='white'
                        placeholder='Выбрать'
                        labelField={'label'}
                        valueField={'value'}
                        value={valueGenre}
                        onChange={(item) => addGenre(item.label)
                        } />
                    <View style={{ width: '100%', marginTop: 10 }}>
                        {renderSelectedGenres}
                    </View>
                </View>
                <View>
                    <Text style={stylesAdminScreen.text_h2}>Цена</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Цена"
                        keyboardType="numeric"
                        value={book.price.toString()}
                        onChangeText={(text) => setBook({ ...book, price: parseFloat(text) || 0 })}
                    />
                </View>
                <View>
                    <Text style={stylesAdminScreen.text_h2}>Синопсис</Text>
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        value={book.description}
                        multiline
                        onChangeText={(text) => setBook({ ...book, description: text })}
                    />
                </View>
                <View>
                    <Text style={stylesAdminScreen.text_h2}>Фрагмент</Text>
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        value={book.excerpt}
                        multiline
                        onChangeText={(text) => setBook({ ...book, excerpt: text })}
                    />
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={[stylesAdminScreen.standard_btn, { borderStyle: 'dashed', borderWidth: 1, borderColor: deepBlue, width: 139, height: 199, flexDirection: 'column' }]} onPress={handlePickCoverImage}>
                        {coverImage
                            ?
                            <Image source={{ uri: coverImage.uri }} style={styles.coverImage} />
                            :
                            <>
                                <AntDesign name="pluscircleo" size={22} color={deepBlue} />
                                <Text style={[stylesAdminScreen.standard_btn_text, { color: deepBlue, marginLeft: 10 }]}>Добавить обложку</Text>
                            </>
                        }
                    </TouchableOpacity>
                    <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <TouchableOpacity style={[stylesAdminScreen.standard_btn, { backgroundColor: purple, width: 180, margin: 10 }]} onPress={handlePickBookFile}>
                            <Text style={stylesAdminScreen.standard_btn_text}>Добавить файл</Text>
                        </TouchableOpacity>
                        {bookFile?.type == 'success' && <Text style={[styles.bookFileName, { width: 180, margin: 10, textAlign: 'center' }]}>{`Файл \n ${bookFile.name} \n успешно добавлен!`}</Text>}
                    </View>
                </View>
                <TouchableOpacity style={[stylesAdminScreen.standard_btn, { backgroundColor: greenRarity }]} onPress={handleAddBook}>
                    <Text style={stylesAdminScreen.standard_btn_text}>Добавить книгу</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-around',
        padding: 20,
        paddingTop: 5,
        backgroundColor: '#fff',
    },
    list_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        padding: 8,
        borderRadius: 5,
        backgroundColor: '#EEEEEE',
    },
    wrapper: {
        // flex:1,
        // justifyContent: 'space-around',
        // padding: 20,
        // backgroundColor: '#fff',
    },
    input: {
        width: '100%',
        height: 40,
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
        fontFamily: 'Montserrat500'
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    coverImage: {
        width: 139,
        height: 199,
        resizeMode: 'cover',
        marginVertical: 10,
        borderRadius: 5,
    },
    bookFileName: {
        // marginVertical: 10,
        marginBottom: 15,
        fontSize: 16,
        color: greenRarity,
        fontFamily: 'MontserratAlt700',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000',

    },
    authorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: gray,
    },
    author: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'MontserratAlt500'

    },
    emptyList: {
        fontSize: 16,
        color: gray,
        alignSelf: 'center',
    }
});


