import { View, Text, FlatList, Button, TextInput, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { blueRarity, gray, greenRarity, redRarity, white, yellowRarity } from '../constants/colors'

interface rarity {
    title: string;
    color: string;
    conditionStart: number;
    conditionEnd: number;
}

export function AdminRarityScreen() {

    const [rarity, setRarity] = useState<rarity>({
        title: '',
        color: '#',
        conditionStart: 0,
        conditionEnd: 0
    });
    const [rarityList, setRarityList] = useState<rarity[]>([
        {
            title: 'Обычная',
            color: greenRarity,
            conditionStart: 0,
            conditionEnd: 900
        },
        {
            title: 'Редкая',
            color: blueRarity,
            conditionStart: 901,
            conditionEnd: 1800
        },
        {
            title: 'Эпическая',
            color: redRarity,
            conditionStart: 1801,
            conditionEnd: 2700
        },
        {
            title: 'Легендарная',
            color: yellowRarity,
            conditionStart: 2701,
            conditionEnd: Infinity
        },
    ]);

    function addRarity() {
        if (rarityList.includes(rarity)) {
            alert('Такая редкость уже существует');
            return;
        }
        if (rarity.title === '' || rarity.color === '' || rarity.conditionStart === rarity.conditionEnd) return;

        setRarityList([...rarityList, rarity]);
        setRarity({
            title: '',
            color: '',
            conditionStart: 0,
            conditionEnd: 0
        });
    }

    function removeRarity(rarity: string) {
        Alert.alert(
            `Вы действительно хотите удалить редкость "${rarity}"?`,
            '',
            [
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                {
                    text: 'Да',
                    //TODO remove rarity
                    onPress: () => {
                        const newRarityList = rarityList.filter(item => item.title !== rarity);
                        setRarityList(newRarityList);
                    },
                },
            ],
            { cancelable: false }
        );
    }

    const handleColorChange = (value: string) => {
        // Remove any characters that are not hex digits
        const hexValue = value.replace(/[^0-9a-fA-F]/g, '');

        // Limit the input to 6 hex digits
        if (hexValue.length > 7) {
            setRarity({ ...rarity, color: "#" + hexValue.slice(0, 7) })
        }
        else {
            setRarity({ ...rarity, color: "#" + hexValue })
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Добавить редкость</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Название редкости</Text>
                <TextInput
                    style={styles.input}
                    value={rarity.title}
                    onChangeText={(text) => setRarity({ ...rarity, title: text })}
                    placeholder="например: обычная"
                    placeholderTextColor={gray}
                    selectionColor={redRarity}
                />
                <Text style={styles.label}>Цвет</Text>
                <TextInput
                    style={styles.input}
                    maxLength={7}
                    value={rarity.color}
                    onChangeText={handleColorChange}
                    placeholder="например: ff0000"
                    placeholderTextColor="#999"
                />
                <Text style={styles.label}>Условие</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.label}>от</Text>
                    <TextInput
                        style={styles.numberInput}
                        keyboardType="numeric"
                        value={rarity.conditionStart.toString()}
                        onChangeText={(value) => {
                            const intValue = parseInt(value || '0', 10);
                            setRarity({
                                ...rarity,
                                conditionStart: Number.isInteger(intValue) ? intValue : 0,
                            });
                        }}
                    />
                    <Text style={styles.label}>до</Text>
                    <TextInput
                        style={styles.numberInput}
                        keyboardType="numeric"
                        value={rarity.conditionEnd.toString()}
                        onChangeText={(value) => {
                            const intValue = parseInt(value || '0', 10);
                            setRarity({
                                ...rarity,
                                conditionEnd: Number.isInteger(intValue) ? intValue : 0,
                            });
                        }}
                    />
                </View>
                <Button title='Добавить' onPress={addRarity} />
            </View>
            <FlatList
                data={rarityList}
                keyExtractor={item => item.title}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.rarityContainer}>
                            <Text style={[styles.rarity, { color: item.color }]}>{item.title}</Text>
                            <Text style={styles.text}>от {item.conditionStart} до {item.conditionEnd}</Text>
                            <Button title='Удалить' onPress={() => removeRarity(item.title)} />
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
    numberInput: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#000',
        width: 150
    },
    rarityContainer: {
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
    rarity: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    },
    emptyList: {
        fontSize: 16,
        color: gray,
        alignSelf: 'center',
    }
})
