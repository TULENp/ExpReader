import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { stylesAdminScreen } from './stylesScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { deepBlue, greenRarity, purple } from '../constants/colors';
import { AntDesign } from '@expo/vector-icons'; 

interface Book {
    title: string;
    price: number;
    description: string;
    excerpt: string;
    coverImageUri?: string;
    bookUri?: string;
}

export function AdminAddBookScreen() {
    const [book, setBook] = useState<Book>({
        title: '',
        price: 0,
        description: '',
        excerpt: '',
    });

    const [coverImage, setCoverImage] = useState<{ uri: string } | null>(null);
    const [bookFile, setBookFile] = useState<{ uri: string } | null>(null);

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

    const handleAddBook = () => {
        // TODO Implement logic for adding book to database or server
        console.log(book);
        console.log(coverImage);
        console.log(bookFile);
    };

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

            <TouchableOpacity style={[stylesAdminScreen.standard_btn,{borderStyle:'dashed', borderWidth:1, borderColor:deepBlue}]} onPress={handlePickCoverImage}>
                <AntDesign name="pluscircleo" size={22} color={deepBlue} />
                <Text style={[stylesAdminScreen.standard_btn_text,{color:deepBlue, marginLeft:10}]}>Добавить обложку</Text>
            </TouchableOpacity>
            {coverImage && <Image source={{ uri: coverImage.uri }} style={styles.coverImage} />}
            <TouchableOpacity style={[stylesAdminScreen.standard_btn,{backgroundColor:purple}]} onPress={handlePickBookFile}>
                <Text style={stylesAdminScreen.standard_btn_text}>Добавить файл книги</Text>
            </TouchableOpacity>
            {bookFile && <Text style={styles.bookFileName}>Файл успешно добавлен!</Text>}
            <TouchableOpacity style={[stylesAdminScreen.standard_btn,{backgroundColor:greenRarity}]} onPress={handleAddBook}>
                <Text style={stylesAdminScreen.standard_btn_text}>Добавить книгу</Text>
            </TouchableOpacity>
            {/* <Button title="Добавить книгу" onPress={handleAddBook} /> */}
            </KeyboardAwareScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-around',
        padding: 20,
        paddingTop:5,
        backgroundColor: '#fff',
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
        fontFamily:'Montserrat500'
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
        marginBottom:15,
        fontSize: 16,
        color:greenRarity,
        fontFamily:'MontserratAlt700',
    },
});


