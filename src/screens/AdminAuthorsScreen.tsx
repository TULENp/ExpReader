import { View, Text, FlatList, Button, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { gray, redRarity, white } from '../constants/colors'

export function AdminAuthorsScreen() {

    const [author, setAuthor] = useState<string>('');
    const authors = ['Груша А.Я.', 'Груша И.Я.'];

    function addAuthor() {
        if (authors.includes(author)) {
            alert('Такой автор уже существует');
            return;
        }
        if (author == '') return;

        authors.push(author);
        console.log(authors);
    }

    function removeAuthor(author: string) {
        Alert.alert(
            `Вы действительно хотите удалить автора "${author}"?`,
            '',
            [
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                {
                    text: 'Да',
                    //TODO remove author
                    onPress: () => alert('Удалено'),
                },
            ],
            { cancelable: false }
        );
    }


    return (
        <View style={{ padding: 10 }}>
            <View >
                <Text>Добавить автора</Text>
                <TextInput style={{ backgroundColor: white }}
                    value={author}
                    onChangeText={setAuthor}
                    selectionColor={redRarity}
                />
                <Button title='Добавить' onPress={addAuthor} />
            </View>
            <FlatList
                data={authors}
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