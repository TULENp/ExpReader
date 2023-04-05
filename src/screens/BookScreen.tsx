import { View, Text, Button, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ShopStackParams, TBook } from '../types';
import { GetBook } from '../service/api';

interface BookParams {
    id: string
}
export default function BookScreen() {
    const { id } = useRoute<RouteProp<Record<string, BookParams>, string>>().params; // get book id from params
    const { navigate } = useNavigation<NavigationProp<ShopStackParams>>();
    const [book, setBook] = useState<TBook>();

    useEffect(() => {
        getBook();
    }, [])

    async function getBook() {
        const result = await GetBook(id);
        if (typeof result !== "string") {
            setBook(result);
        }
    }

    //TODO add Loading
    return (
        <SafeAreaView>
            {!book
                ?
                <Text>Книга не найдена</Text>
                :
                <>
                    <Text>{id}</Text>
                    <Text>{book?.title}</Text>
                    <Button title='Купить' onPress={() => navigate('Checkout', { book })} />
                </>
            }
        </SafeAreaView>
    )
}