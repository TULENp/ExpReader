import { View, Text, Image, FlatList, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { achievements } from '../AppData/achievements'
import { stylesAchievementsScreen } from './stylesScreen'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AdminStackParams, TAchieves } from '../types';

export function AdminAchievesScreen() {
    const { navigate } = useNavigation<NavigationProp<AdminStackParams>>();
    const [achieves, setAchieves] = useState<TAchieves[]>(achievements);

    function removeAchieve(achieve: string) {
        Alert.alert(
            `Вы действительно хотите удалить достижение "${achieve}"?`,
            '',
            [
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                {
                    text: 'Да',
                    //TODO remove achieve
                    onPress: () => {
                        const newAchievesList = achieves.filter(item => item.title !== achieve);
                        setAchieves(newAchievesList);
                    },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <>
            <View>
                <Button title='Добавить достижение' onPress={() => navigate('AddAchieve')} />
                {/* Achievements list */}
                {achieves &&
                    <FlatList data={achieves}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={stylesAchievementsScreen.container_achiv} key={item.id}>
                                    <View style={stylesAchievementsScreen.wrapper_pin}>
                                        <Image style={{ width: 80, height: 80 }} source={item.img} />
                                    </View>
                                    <View style={stylesAchievementsScreen.wrapper_pin_info}>
                                        <Text style={stylesAchievementsScreen.title}>{item.title}</Text>
                                        <Text style={stylesAchievementsScreen.text}>{item.description}</Text>
                                        <Button title='Удалить' onPress={() => removeAchieve(item.title)} />
                                    </View>
                                </View>
                            );
                        }}
                    />
                }
            </View>
        </>
    )
}