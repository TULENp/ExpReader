import { View, Text, FlatList, Button, TextInput, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { gray, redRarity, white } from '../constants/colors'

interface task {
    title: string;
    condition: number;
}

export function AdminDailyTaskScreen() {

    const [task, setTask] = useState<task>({ title: '', condition: 0 });
    const [taskList, setTaskList] = useState<task[]>([
        { title: 'Легкий', condition: 60 },
        { title: 'Средний', condition: 120 },
        { title: 'Серьезный', condition: 240 },
    ]);

    function addDailyTask() {
        if (taskList.includes(task)) {
            alert('Такая цель уже существует');
            return;
        }
        if (task.title === '' || task.condition === 0) return;

        setTaskList([...taskList, task]);
        setTask({ title: '', condition: 0 });
    }

    function removeTask(task: string) {
        Alert.alert(
            `Вы действительно хотите удалить уровень цели "${task}"?`,
            '',
            [
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                {
                    text: 'Да',
                    //TODO remove task
                    onPress: () => {
                        const newAuthors = taskList.filter(item => item.title !== task);
                        setTaskList(newAuthors);
                    },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Добавить ежедневную цель</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Уровень цели</Text>
                <TextInput
                    style={styles.input}
                    value={task.title}
                    onChangeText={(text) => setTask({ ...task, title: text })}
                    placeholder="например: Легкий"
                    placeholderTextColor={gray}
                    selectionColor={redRarity}
                />
                <Text style={styles.label}>Условие выполнения</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={task.condition.toString()}
                    onChangeText={(value) => {
                        const intValue = parseInt(value || '0', 10);
                        setTask({
                            ...task,
                            condition: Number.isInteger(intValue) ? intValue : 0,
                        });
                    }}
                />
                <Button title='Добавить' onPress={addDailyTask} />
            </View>
            <FlatList
                data={taskList}
                keyExtractor={item => item.title}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.taskContainer}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.text}>{item.condition}</Text>
                            <Button title='Удалить' onPress={() => removeTask(item.title)} />
                        </View>
                    )
                }}
                ListEmptyComponent={
                    <Text style={styles.emptyList}>Список авторов пуст</Text>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000',

    },
    input: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#000',
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: gray,
    },
    text: {
        fontSize: 16,
        color: '#000',
    },
    emptyList: {
        fontSize: 16,
        color: gray,
        alignSelf: 'center',
    }
})
