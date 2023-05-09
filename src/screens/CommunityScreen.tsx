import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { UserCard } from '../components/UserCard'
import { stylesShopScreen } from './stylesScreen';
import { Input } from '@rneui/themed';

export function CommunityScreen() {

    const [searchSubscription,setSearchSubscription] = useState<string>('');

    return (
        <ScrollView style={{flex:1,backgroundColor:'white',paddingLeft:13,paddingRight:13}}>
            <View style={[stylesShopScreen.container_search_input,{width:'100%'}]}>
				<Input
					onChangeText={(text) => {
                        setSearchSubscription(text)
                        }}
					placeholder={'Найти пользователей'}
					inputContainerStyle={{ borderBottomWidth: 0 }}
					leftIcon={{ type: 'octicons', name: 'search' }}
					style={[stylesShopScreen.search_input, { fontFamily: 'MontserratAlt400',}]} />
			</View>
            {/* <Text>    Все / Рекомендованные / Подписки</Text> */}
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

        </ScrollView>
    )
}