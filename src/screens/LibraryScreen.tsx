import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LibraryScreen() {
    //TODO fix TS navigation error
    const navigation = useNavigation();

    return (
        <View>
            <Text>LibraryScreen</Text>
            <Button
                title='to book screen'
                onPress={() => navigation.navigate('Book')}
            />
            <Button
                title='to reader screen'
                onPress={() => navigation.navigate('Reader')}
            />
        </View>
    );
}