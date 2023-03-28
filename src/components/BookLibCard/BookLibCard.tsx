import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LibStackParams, TBookmark, TLibBook, TRarity } from '../../types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { calculateBookmark, calculateRarity } from '../../service/motivation';

type BookLibCardProps = {
    book: TLibBook;
}

export function BookLibCard({ book }: BookLibCardProps) {
    // Define the navigation prop with the appropriate type for the Reader screen
    const { navigate } = useNavigation<NavigationProp<LibStackParams>>();
    const { author, bookPages, cover, currentPage, id, isRead, readDate, readPages, title } = book;

    const [rarity, setRarity] = useState<TRarity>();
    const [bookmark, setBookmark] = useState<TBookmark>();

    useEffect(() => {
        setRarity(calculateRarity(bookPages));
    }, [bookPages])

    useEffect(() => {
        setBookmark(calculateBookmark(readPages, bookPages));
    }, [readPages])

    return (
        <TouchableOpacity onPress={() => navigate('Reader', { book })}>
            <View style={{ margin: 10, padding: 5, borderBottomWidth: 1 }}>
                <Text>{rarity}</Text>
                <Text>{bookmark}</Text>
                <Text>{title}</Text>
                <Text>{author}</Text>
                <Text>{`${readPages}/${bookPages}`}</Text>
            </View>
        </TouchableOpacity>
    );
}