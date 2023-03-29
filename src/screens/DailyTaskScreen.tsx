import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDailyTaskAS, setDailyTaskAS } from '../service/asyncStorage'
import { getDailyTaskLevel } from '../service/motivation';
import { TDailyTask } from '../types';

export default function DailyTaskScreen() {
    const [dailyTaskLevel, setDailyTaskLevel] = useState<string>();

    useEffect(() => {
        getDailyTask();
    }, [])

    async function getDailyTask() {
        const dailyTask = await getDailyTaskAS();
        const level = getDailyTaskLevel(dailyTask);
        setDailyTaskLevel(level);
    }

    function setDailyTask(dailyTask: TDailyTask) {
        setDailyTaskAS(dailyTask);
        getDailyTask();
    }

    return (
        <View>
            <Text style={{ alignSelf: 'center', margin: 10 }}>Уровень: {dailyTaskLevel}</Text>
            <Button title='Легкий' onPress={() => setDailyTask(60)} />
            <Button title='Нормальный' onPress={() => setDailyTask(120)} />
            <Button title='Серьезный' onPress={() => setDailyTask(240)} />
        </View>
    )
}