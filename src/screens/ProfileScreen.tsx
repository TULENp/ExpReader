import { View, Text, SafeAreaView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProfileStackParams, TUserData } from '../types';
import { getUserDataAS } from '../service/asyncStorage';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {

    const [userData, setUserData] = useState<TUserData | null>(null);
    const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();

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
                <>
                    <View>
                        <Text>{userData.nickname}</Text>
                        <Text>pages: {userData.readPagesNum}</Text>
                        <Text>books: {userData.readBooksNum}</Text>
                    </View>
                    <Button title='to achievements' onPress={() => navigate('Achievements')} />
                    <Button title='to daily task settings' onPress={() => navigate('DailyTask')} />
                </>
                :
                <Text>Ошибка. Пользователь не найден</Text>
            }
        </SafeAreaView>
    )
}