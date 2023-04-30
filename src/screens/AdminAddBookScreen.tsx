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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

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
            <View>
                <Text>Название</Text>
                <TextInput
                    style={styles.input}
                    value={book.title}
                    onChangeText={(text) => setBook({ ...book, title: text })}
                />
            </View>
            <View>
                <Text>Цена</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Цена"
                    keyboardType="numeric"
                    value={book.price.toString()}
                    onChangeText={(text) => setBook({ ...book, price: parseFloat(text) || 0 })}
                />
            </View>
            <View>
                <Text>Синопсис</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    value={book.description}
                    multiline
                    onChangeText={(text) => setBook({ ...book, description: text })}
                />
            </View>
            <View>
                <Text>Фрагмент</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    value={book.excerpt}
                    multiline
                    onChangeText={(text) => setBook({ ...book, excerpt: text })}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handlePickCoverImage}>
                <Text style={styles.buttonText}>Pick cover image</Text>
            </TouchableOpacity>
            {coverImage && <Image source={{ uri: coverImage.uri }} style={styles.coverImage} />}
            <TouchableOpacity style={styles.button} onPress={handlePickBookFile}>
                <Text style={styles.buttonText}>Pick book file</Text>
            </TouchableOpacity>
            {bookFile && <Text style={styles.bookFileName}>{bookFile.uri}</Text>}
            <Button title="Добавить книгу" onPress={handleAddBook} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        width: '100%',
        height: 40,
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
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
        marginVertical: 10,
        fontSize: 16,
    },
});


