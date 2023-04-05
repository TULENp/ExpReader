import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRoute, RouteProp } from '@react-navigation/native';
import { TBook } from '../types';
interface CheckoutParams {
    book: TBook
}
export default function CheckoutScreen() {
    const { book } = useRoute<RouteProp<Record<string, CheckoutParams>, string>>().params; // get book id from params

    return (
        <View>
            <Text>{book.title}</Text>
            <Text>{book.price}</Text>
            <Button title='Оплатить' />
        </View>
    )
}