import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { TLibBook } from '../../types';
import { useNavigation } from '@react-navigation/native';


export function BookLibCard({ book }: { book: TLibBook }) {
    const { author, bookPages, cover, currentPage, id, isRead, readDate, readPages, title } = book;
    //TODO fix TS navigation error
    const { navigate } = useNavigation<any>();

    return (
        <TouchableOpacity onPress={() => navigate('Reader', { book: book })}>
            <View style={{ margin: 10, padding: 5, borderBottomWidth: 1 }}>
                <Text>{title}</Text>
                <Text>{author}</Text>
                <Text>{readPages + '/' + bookPages}</Text>
            </View>
        </TouchableOpacity>
    )
}