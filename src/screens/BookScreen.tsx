import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ShopStackParams, TBook } from '../types';

interface BookParams {
    id: string
}
export default function BookScreen() {
    const { id } = useRoute<RouteProp<Record<string, BookParams>, string>>().params; // get book id from params
    const { navigate } = useNavigation<NavigationProp<ShopStackParams>>();
    const [book, setBook] = useState<TBook>()

    return (
        <View>
            <Text>{id}</Text>
            <Button title='Купить' onPress={() => navigate('Checkout', { book })} />
        </View>
    )
}