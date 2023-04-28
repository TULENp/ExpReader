import { View, Text, FlatList, Button, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { gray, redRarity, white } from '../constants/colors'

export function AdminGenresScreen() {

    const [genre, setGenre] = useState<string>('');
    const genres = ['Фантастика', 'Приключения', 'Фэнтези', 'Классика',
        'Роман', 'Поэзия', 'Хоррор', 'Нон-Фикшн', 'Комедия', 'Исторический роман',
        'Детектив', 'Детские книги']

    function addAuthor() {
        if (genres.includes(genre)) {
            alert('Такой жанр уже существует');
            return;
        }
        if (genre == '') return;

        genres.push(genre);
        console.log(genres);
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
                    onPress: () => alert('Удалено'),
                },
            ],
            { cancelable: false }
        );
    }


    return (
        <View style={{ padding: 10 }}>
            <View >
                <Text>Добавить жанр</Text>
                <TextInput style={{ backgroundColor: white }}
                    value={genre}
                    onChangeText={setGenre}
                    selectionColor={redRarity}
                />
                <Button title='Добавить' onPress={addAuthor} />
            </View>
            <FlatList
                data={genres}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                    return (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, backgroundColor: gray }}>
                            <Text>{item}</Text>
                            <Button title='Удалить' onPress={() => removeAuthor(item)} />
                        </View>
                    )
                }
                }
            />
        </View >
    )
}