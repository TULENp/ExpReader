import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LibraryScreen() {
    //TODO fix TS navigation error
    const { navigate } = useNavigation();

    return (
        <View>
            <Text>LibraryScreen</Text>
            <Button
                title='to book screen'
                onPress={() => navigate('Book')}
            />
            <Button
                title='to reader screen'
                onPress={() => navigate('Reader')}
            />
        </View>
    );
}