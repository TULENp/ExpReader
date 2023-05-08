import { View, Text } from 'react-native'
import React from 'react'
import { UserCard } from '../components/UserCard'

export function CommunityScreen() {

    return (
        <View>
            <Text>    Поисковая строка</Text>
            <Text>    Все / Рекомендованные / Подписки</Text>
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
    )
}