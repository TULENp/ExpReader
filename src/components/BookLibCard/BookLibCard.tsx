import { View, Text } from 'react-native'
import React from 'react'
import { TLibBook } from '../../types'

export function BookLibCard({ book }: { book: TLibBook }) {
    const { author, bookPages, cover, currentPage, id, isRead, readDate, readPages, title } = book;
    return (
        <View style={{ margin: 10, padding: 5, borderBottomWidth: 1 }}>
            <Text>{title}</Text>
            <Text>{author}</Text>
            <Text>{readPages + '/' + bookPages}</Text>

        </View>
    )
}