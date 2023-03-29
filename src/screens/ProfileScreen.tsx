import { View, Text, SafeAreaView, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProfileStackParams, TDailyTask, TUserData } from '../types';
import { getDailyTaskAS, getTodayPagesAS, getUserDataAS } from '../service/asyncStorage';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { DailyTaskProgress } from '../components/DailyTaskProgress';
import { getDailyTaskLevel } from '../service/motivation';

export default function ProfileScreen() {

    const [userData, setUserData] = useState<TUserData | null>(null);
    const [todayPages, setTodayPages] = useState<number>(0);
    const [dailyTaskPages, setDailyTaskPages] = useState<TDailyTask>(60);
    const [dailyTaskLevel, setDailyTaskLevel] = useState<string>('');
    const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();

    useFocusEffect(
        React.useCallback(() => {
            getUserData();
            getTodayPages();
            getDailyTask();
            setDailyTaskLevel(getDailyTaskLevel(dailyTaskPages));
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

    async function getDailyTask() {
        const dailyTask = await getDailyTaskAS();
        setDailyTaskPages(dailyTask);
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
                    <DailyTaskProgress dailyTaskPages={dailyTaskPages} todayPages={todayPages} level={dailyTaskLevel} />
                    <Button title='to achievements' onPress={() => navigate('Achievements')} />
                </>
                :
                <Text>Ошибка. Пользователь не найден</Text>
            }
        </SafeAreaView>
    )
}