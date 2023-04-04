import { View, Text, Button } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';

interface BookParams {
    id: string
}
export default function BookScreen() {
    const { id } = useRoute<RouteProp<Record<string, BookParams>, string>>().params; // get book id from params

    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}