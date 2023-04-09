import { View, Text, Button, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ShopStackParams, TBook } from '../types';
import { GetBook, SwitchFavorite } from '../service/api';
import { imageURL } from '../constants';

interface BookParams {
    id: string
}
export function BookScreen() {
    const { navigate } = useNavigation<NavigationProp<ShopStackParams>>();
    const { id } = useRoute<RouteProp<Record<string, BookParams>, string>>().params; // get book id from params
    const [book, setBook] = useState<TBook>();

    useEffect(() => {
        getBook();
    }, [id])

    async function getBook() {
        const result = await GetBook(id);
        if (typeof result !== "string") {
            setBook(result);
        }
    }

    async function switchFavorite() {
        const result = await SwitchFavorite(id);
        
        //TODO update screen if successful
        // if (typeof result !== "string") {
        // }
    }

    //TODO add Loading
    return (
        <SafeAreaView style={{ padding: 10 }}>
            {!book
                ?
                <Text>Книга не найдена</Text>
                :
                <>
                    <Image style={{ width: 150, height: 200 }} source={{ uri: imageURL + book.cover }} />
                    <Text>{book.title}</Text>
                    <Text>{book.authors}</Text>
                    <Text>{book.price}</Text>
                    <Text>{book.genres.join(', ')}</Text>
                    <Button title='Купить' onPress={() => navigate('Checkout', { book })} />
                    <Button title={book.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'} onPress={switchFavorite} />
                </>
            }
        </SafeAreaView>
    )
}