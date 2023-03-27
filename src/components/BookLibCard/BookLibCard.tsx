import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LibStackParams, TLibBook } from '../../types';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type BookLibCardProps = {
    book: TLibBook;
}

export function BookLibCard({ book }: BookLibCardProps) {
    // Define the navigation prop with the appropriate type for the Reader screen
    const navigation = useNavigation<NavigationProp<LibStackParams>>();
    const { author, bookPages, cover, currentPage, id, isRead, readDate, readPages, title } = book;

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Reader', { book })}>
            <View style={{ margin: 10, padding: 5, borderBottomWidth: 1 }}>
                <Text>{title}</Text>
                <Text>{author}</Text>
                <Text>{`${readPages}/${bookPages}`}</Text>
            </View>
        </TouchableOpacity>
    );
}