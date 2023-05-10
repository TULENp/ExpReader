import { View, Text, Image, FlatList, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { achievements } from '../AppData/achievements'
import { stylesAchievementsScreen, stylesAdminScreen } from './stylesScreen'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AdminStackParams, TAchieves } from '../types';
import { greenRarity, redRarity } from '../constants/colors';

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
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{marginLeft:13,marginRight:13,marginTop:10}}>
                    <TouchableOpacity style={[stylesAdminScreen.standard_btn,{backgroundColor:greenRarity,}]} onPress={() => navigate('AddAchieve')}>
                        <Text style={stylesAdminScreen.standard_btn_text}>Добавить достижение</Text>
                    </TouchableOpacity>
                </View>
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
                                        <TouchableOpacity style={[{backgroundColor:redRarity, padding:10,borderRadius:5,marginTop:10}]} onPress={() => removeAchieve(item.title)}>
                                            <Text style={[stylesAdminScreen.standard_btn_text,{fontFamily:'MontserratAlt700', fontSize:14, textAlign:'center'}]}>Удалить</Text>
                                        </TouchableOpacity>
                                        {/* <Button title='Удалить' onPress={() => removeAchieve(item.title)} /> */}
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