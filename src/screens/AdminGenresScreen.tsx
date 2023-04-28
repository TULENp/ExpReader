import { View, Text, FlatList, Button, TextInput, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { gray, redRarity, white } from '../constants/colors'

export function AdminGenresScreen() {

    const [genre, setGenre] = useState<string>('');
    const [genresList, setGenresList] = useState<string[]>(['Фантастика', 'Приключения', 'Фэнтези', 'Классика',
        'Роман', 'Поэзия', 'Хоррор', 'Нон-Фикшн', 'Комедия', 'Исторический роман',
        'Детектив', 'Детские книги'])

    function addAuthor() {
        if (genresList.includes(genre)) {
            alert('Такой автор уже существует');
            return;
        }
        if (genre == '') return;

        setGenresList([...genresList, genre]);
        setGenre('');
    }

    function removeAuthor(genre: string) {
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
                <Text style={styles.label}>Добавить жанр</Text>
                <TextInput
                    style={styles.input}
                    value={genre}
                    onChangeText={setGenre}
                    placeholder="Введите жанр"
                    placeholderTextColor={gray}
                    selectionColor={redRarity}
                />
                <Button title='Добавить' onPress={addAuthor} />
            </View>
            <FlatList
                data={genresList}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.authorContainer}>
                            <Text style={styles.author}>{item}</Text>
                            <Button title='Удалить' onPress={() => removeAuthor(item)} />
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
        fontSize: 16,
        color: '#000',
    },
    emptyList: {
        fontSize: 16,
        color: gray,
        alignSelf: 'center',
    }
})
