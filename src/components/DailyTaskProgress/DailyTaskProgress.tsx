import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProfileStackParams, TDailyTask } from '../../types';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';

interface IDailyTaskProgressProps {
    todayPages: number;
    dailyTaskPages: TDailyTask;
    level: string;
}

export function DailyTaskProgress({ todayPages, dailyTaskPages, level }: IDailyTaskProgressProps) {
    const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();

    // const [level, setLevel] = useState<string>('');

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getDailyTaskLevel(dailyTaskPages);
    //     }, [])
    // );

    // function getDailyTaskLevel(dailyTaskPages: TDailyTask) {
    //     let level = '';
    //     switch (dailyTaskPages) {
    //         case 60:
    //             {
    //                 level = 'Легкий';
    //                 break;
    //             }
    //         case 120:
    //             {
    //                 level = 'Нормальный';
    //                 break;
    //             }
    //         case 240:
    //             {
    //                 level = 'Серьезный';
    //                 break;
    //             }
    //     }
    //     setLevel(level);
    // }

    return (
        <Pressable onPress={() => navigate('DailyTask')} style={{ padding: 10, backgroundColor: 'gray' }}>
            {/* FIXME //! level is not updating  */}
            <Text>Уровень: {level}</Text>
            {todayPages >= dailyTaskPages
                ?
                <>
                    <Text>Задание выполнено! Получено: {dailyTaskPages} очков чтения</Text>
                    <Text>За сегодня прочитано: {todayPages}</Text>
                </>
                :
                <Text>Прочитанные страницы: {todayPages}/{dailyTaskPages}</Text>
            }
        </Pressable>
    )
}