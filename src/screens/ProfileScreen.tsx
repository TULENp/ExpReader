import { View, Text, SafeAreaView, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProfileStackParams, TUserData } from '../types';
import { getTodayPagesAS, getUserDataAS } from '../service/asyncStorage';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {

    const [userData, setUserData] = useState<TUserData | null>(null);
    const [todayPages, setTodayPages] = useState<number>(0);
    const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();

    useFocusEffect(
        React.useCallback(() => {
            getUserData();
            getTodayPages()
        }, [])
    );

    async function getUserData() {
        const data = await getUserDataAS();
        setUserData(data);
    }

    async function getTodayPages() {
        const todayPages = await getTodayPagesAS();
        setTodayPages(todayPages);
    }

    return (
        <SafeAreaView style={{ padding: 10 }}>
            {userData
                ?
                <>
                    <View>
                        <Text>{userData.nickname}</Text>
                        <Text>pages: {userData.readPagesNum}</Text>
                        <Text>books: {userData.readBooksNum}</Text>
                    </View>
                    <Pressable>
                        <Text>Прочитанные страницы: {todayPages}</Text>
                    </Pressable>
                    <Button title='to daily task settings' onPress={() => navigate('DailyTask')} />
                    <Button title='to achievements' onPress={() => navigate('Achievements')} />
                </>
                :
                <Text>Ошибка. Пользователь не найден</Text>
            }
        </SafeAreaView>
    )
}