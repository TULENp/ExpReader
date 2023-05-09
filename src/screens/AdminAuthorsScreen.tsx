import { View, Text, FlatList, Button, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { gray, greenRarity, redRarity, white } from '../constants/colors'
import { stylesAdminScreen } from './stylesScreen';

export function AdminAuthorsScreen() {

    const [author, setAuthor] = useState<string>('');
    const [authorsList, setAuthorsList] = useState<string[]>(['Груша А.Я.', 'Груша И.Я.']);

    function addAuthor() {
        if (authorsList.includes(author)) {
            alert('Такой автор уже существует');
            return;
        }
        if (author == '') return;

        setAuthorsList([...authorsList, author]);
        setAuthor('');
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
                    onPress: () => {
                        const newAuthors = authorsList.filter(item => item !== author);
                        setAuthorsList(newAuthors);
                    },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={stylesAdminScreen.text_h2}>Добавить автора</Text>
                <TextInput
                    style={[stylesAdminScreen.input,{marginTop:10}]}
                    value={author}
                    onChangeText={setAuthor}
                    placeholder="Введите имя автора"
                    placeholderTextColor={gray}
                    selectionColor={redRarity}
                />
                <TouchableOpacity style={[stylesAdminScreen.standard_btn,{backgroundColor:greenRarity}]} onPress={addAuthor}>
                    <Text style={stylesAdminScreen.standard_btn_text}>Добавить автора</Text>
                </TouchableOpacity>
                {/* <Button title='Добавить' onPress={addAuthor} /> */}
            </View>
            <FlatList
                data={authorsList}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                    return (
                        <View style={stylesAdminScreen.list_container}>
                            <Text style={styles.author}>{item}</Text>
                            <TouchableOpacity style={[{backgroundColor:redRarity, padding:10,borderRadius:5}]} onPress={() => removeAuthor(item)}>
                                <Text style={[stylesAdminScreen.standard_btn_text,{fontFamily:'MontserratAlt700', fontSize:14}]}>Удалить</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                ListEmptyComponent={
                    <Text style={styles.emptyList}>Список авторов пуст</Text>
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
        fontFamily:'MontserratAlt500'

    },
    emptyList: {
        fontSize: 16,
        color: gray,
        alignSelf: 'center',
    }
})
