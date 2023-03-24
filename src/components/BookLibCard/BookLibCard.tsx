import { View, Text } from 'react-native'
import React from 'react'
import { TLibBook } from '../../types/types'

export function BookLibCard(book: TLibBook) {
    return (
        <View>
            <Text>BookLibCard</Text>
            <Text>{book.title}</Text>
        </View>
    )
}