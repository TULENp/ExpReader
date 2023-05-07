import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AdminStackParams } from '../types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { clearTokenAS } from '../service/asyncStorage';
import { pink, purple, redRarity } from '../constants/colors';
import { stylesAdminScreen } from './stylesScreen';

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
                <TouchableOpacity style={stylesAdminScreen.buttons} onPress={() => navigate('AllBooks')}>
                    <Text style={stylesAdminScreen.buttons_text}>Книги</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesAdminScreen.buttons} onPress={() => navigate('Genres')}>
                    <Text style={stylesAdminScreen.buttons_text}>Жанры</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesAdminScreen.buttons} onPress={() => navigate('Authors')}>
                    <Text style={stylesAdminScreen.buttons_text}>Авторы</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesAdminScreen.buttons} onPress={() => navigate('Achieves')}>
                    <Text style={stylesAdminScreen.buttons_text}>Достижения</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesAdminScreen.buttons} onPress={() => navigate('DailyTask')}>
                    <Text style={stylesAdminScreen.buttons_text}>Ежедневная цель</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesAdminScreen.buttons} onPress={() => navigate('Rarity')}>
                    <Text style={stylesAdminScreen.buttons_text}>Редкость</Text>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={[stylesAdminScreen.buttons,{backgroundColor:redRarity}]} onPress={LogOut}>
                    <Text style={stylesAdminScreen.buttons_text}>Выйти</Text>
            </TouchableOpacity>
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
