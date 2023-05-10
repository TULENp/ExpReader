import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { UserCard } from '../components/UserCard'
import { stylesCheckoutScreen, stylesShopScreen } from './stylesScreen';
import { Input } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ProfileStackParams } from '../types';

export function CommunityScreen() {

    const [searchUser, setSearchUser] = useState<string>('');
    const { goBack } = useNavigation<NavigationProp<ProfileStackParams>>();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
            <View style={[stylesCheckoutScreen.container_header, { marginHorizontal: 13, marginTop: 20 }]}>
                <TouchableOpacity onPress={() => goBack()}>
                    <MaterialIcons name="keyboard-backspace"
                        size={36}
                        color="black"
                    />
                </TouchableOpacity>
                <Text style={stylesCheckoutScreen.text_header}>Сообщество</Text>
            </View>
            <View style={[stylesShopScreen.container_search_input, { width: '100%', paddingLeft: 13, paddingRight: 13, height: 20, marginTop: 20 }]}>
                <Input
                    containerStyle={{ backgroundColor: '#EEE', height: 50, borderRadius: 8 }}
                    onChangeText={(text) => {
                        setSearchUser(text)
                    }}
                    placeholder={'Найти пользователей'}
                    inputContainerStyle={{ borderBottomWidth: 0, }}
                    leftIcon={{ type: 'octicons', name: 'search' }}
                    style={[stylesShopScreen.search_input, { fontFamily: 'MontserratAlt400', }]} />
            </View>
            {/* <Text>    Все / Рекомендованные / Подписки</Text> */}
            <View style={{ marginTop: 50, paddingBottom: 15 }}>
                <UserCard userData={{
                    nickname: 'Антон',
                    readPagesNum: 0,
                    readBooksNum: 0,
                    achievements: [],
                    userBooks: [],
                    favGenre: 'Роман',
                    favAuthor: 'Федор Достоевский',
                    isSub: true,
                }} />
                <UserCard userData={{
                    nickname: 'Павел',
                    readPagesNum: 0,
                    readBooksNum: 0,
                    achievements: [],
                    userBooks: [],
                    favGenre: 'Приключения',
                    favAuthor: 'Анжей Сапковский',
                    isSub: true,
                }} />
                <UserCard userData={{
                    nickname: 'Cyber228Pro1337',
                    readPagesNum: 0,
                    readBooksNum: 0,
                    achievements: [],
                    userBooks: [],
                    favGenre: 'Роман',
                    favAuthor: 'Михаил Юрьевич Лермонтов',
                    isSub: false,
                }} />
            </View>


        </ScrollView>
    )
}