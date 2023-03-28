import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TUserData } from '../types';
import { getUserDataAS } from '../service/asyncStorage';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen() {

    const [userData, setUserData] = useState<TUserData | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            getUserData();
        }, [])
    );

    async function getUserData() {
        const data = await getUserDataAS();
        setUserData(data);
    }

    return (
        <SafeAreaView style={{ padding: 10 }}>
            {userData
                ?
                <View>
                    <Text>{userData.nickname}</Text>
                    <Text>pages: {userData.readPagesNum}</Text>
                    <Text>books: {userData.readBooksNum}</Text>
                </View>
                :
                <Text>Ошибка. Пользователь не найден</Text>
            }
        </SafeAreaView>
    )
}