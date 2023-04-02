import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNewDailyTaskAS, setDailyTaskAS } from '../service/asyncStorage'
import { getDailyTaskLevel } from '../service/motivation';
import { TDailyTask } from '../types';
import { RouteProp, useRoute } from '@react-navigation/native';

type DailyTaskParams = {
    todayPages: number;
}
export default function DailyTaskScreen() {
    const { todayPages } = useRoute<RouteProp<Record<string, DailyTaskParams>, string>>().params; // get today pages from params
    const [dailyTaskLevel, setDailyTaskLevel] = useState<string>();

    useEffect(() => {
        getDailyTask();
    }, [])

    //TODO mb get newDailyTask instead
    async function getDailyTask() {
        const dailyTask: TDailyTask = await getNewDailyTaskAS();
        const level: string = getDailyTaskLevel(dailyTask);
        setDailyTaskLevel(level);
    }

    function setDailyTask(dailyTask: TDailyTask) {
        setDailyTaskAS(dailyTask, todayPages);
        getDailyTask();
    }

    return (
        <View style={{ alignSelf: 'center', margin: 10 }}>
            <Text >Уровень: {dailyTaskLevel}</Text>
            <Button title='Легкий' onPress={() => setDailyTask(60)} />
            <Button title='Нормальный' onPress={() => setDailyTask(120)} />
            <Button title='Серьезный' onPress={() => setDailyTask(240)} />
            <Text>Изменения вступят в силу только на следующий день или если вы сегодня еще ничего не прочитали</Text>
        </View>
    )
}