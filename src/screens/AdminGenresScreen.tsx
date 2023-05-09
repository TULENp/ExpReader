import { View, Text, FlatList, Button, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { gray, greenRarity, redRarity, white } from '../constants/colors'
import { stylesAdminScreen } from './stylesScreen';

export function AdminGenresScreen() {

    const [genre, setGenre] = useState<string>('');
    const [genresList, setGenresList] = useState<string[]>(['Фантастика', 'Приключения', 'Фэнтези', 'Классика',
        'Роман', 'Поэзия', 'Хоррор', 'Нон-Фикшн', 'Комедия', 'Исторический роман',
        'Детектив', 'Детские книги'])

    function addGenre() {
        if (genresList.includes(genre)) {
            alert('Такой жанр уже существует');
            return;
        }
        if (genre == '') return;

        setGenresList([...genresList, genre]);
        setGenre('');
    }

    function removeGenre(genre: string) {
        Alert.alert(
            `Вы действительно хотите удалить жанр "${genre}"?`,
            '',
            [
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                {
                    text: 'Да',
                    //TODO remove genre
                    onPress: () => {
                        const newAuthors = genresList.filter(item => item !== genre);
                        setGenresList(newAuthors);
                    },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={stylesAdminScreen.text_h2}>Добавить жанр</Text>
                <TextInput
                    style={[styles.input,{marginTop:10}]}
                    value={genre}
                    onChangeText={setGenre}
                    placeholder="Введите жанр"
                    placeholderTextColor={gray}
                    selectionColor={redRarity}
                />
                {/* <Button title='Добавить' onPress={addAuthor} /> */}
                <TouchableOpacity style={[stylesAdminScreen.standard_btn,{backgroundColor:greenRarity}]} onPress={addGenre}>
                    <Text style={stylesAdminScreen.standard_btn_text}>Добавить жанр</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={genresList}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.genresContainer}>
                            <Text style={styles.genre}>{item}</Text>
                            {/* <Button title='Удалить' onPress={() => removeGenre(item)} /> */}
                            <TouchableOpacity style={[{backgroundColor:redRarity, padding:10,borderRadius:5}]} onPress={() => removeGenre(item)}>
                                <Text style={[stylesAdminScreen.standard_btn_text,{fontFamily:'MontserratAlt700', fontSize:14}]}>Удалить</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                ListEmptyComponent={
                    <Text style={styles.emptyList}>Список жанров пуст</Text>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000',
    },
    input: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#000',
        fontFamily:'Montserrat500',
    },
    genresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#EEEEEE',
    },
    genre: {
        fontSize: 16,
        color: '#000',
        fontFamily:'MontserratAlt500'
    },
    emptyList: {
        fontSize: 16,
        color: gray,
        alignSelf: 'center',
    }
})
