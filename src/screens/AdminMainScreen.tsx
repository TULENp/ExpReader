import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { AdminStackParams } from '../types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { clearTokenAS } from '../service/asyncStorage';

export function AdminMainScreen() {
    const { setIsAuthorized, isGotBackend } = useContext(AppContext)
    const { navigate } = useNavigation<NavigationProp<AdminStackParams>>();

    function LogOut() {
        clearTokenAS();
        setIsAuthorized(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button title={'Книги'} onPress={() => navigate('AllBooks')} />
                <Button title={'Жанры'} onPress={() => navigate('Genres')} />
                <Button title={'Авторы'} onPress={() => navigate('Authors')} />
                <Button title={'Достижения'} onPress={() => navigate('Achieves')} />
                <Button title={'Ежедневная цель'} onPress={() => navigate('DailyTask')} />
                <Button title={'Редкость'} onPress={() => navigate('Rarity')} />
            </View>
            <Button title={'Выйти'} onPress={LogOut} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 40,
        justifyContent: 'space-between',
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});
