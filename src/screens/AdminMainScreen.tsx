import { View, Text, Button } from 'react-native'
import React from 'react'
import { AdminStackParams } from '../types';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export function AdminMainScreen() {
    const { navigate } = useNavigation<NavigationProp<AdminStackParams>>();

    return (
        <View>
            <Button title={'Книги'} onPress={() => navigate('AllBooks')} />
            <Button title={'Жанры'} onPress={() => navigate('Genres')} />
            <Button title={'Авторы'} onPress={() => navigate('Authors')} />
        </View>
    )
}