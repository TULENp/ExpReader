import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRoute, RouteProp } from '@react-navigation/native';
import { TBook } from '../types';
import { BuyBook } from '../service/api';
interface CheckoutParams {
    book: TBook
}
export function CheckoutScreen() {
    const { book } = useRoute<RouteProp<Record<string, CheckoutParams>, string>>().params; // get book id from params

    async function buyBook() {
        const res = await BuyBook(book.id);
        //TODO give feedback
    }
    return (
        <View>
            <Text>{book.title}</Text>
            <Text>{book.price}</Text>
            <Button title='Оплатить' onPress={buyBook} />
        </View>
    )
}