import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { ProfileStackParams, TUserData } from '../../types';
import { stylesBookLibCard } from '../BookLibCard/style';
import { stylesProfileScreen } from '../../screens/stylesScreen';
import { stylesUserCard } from './style';
import { deepBlue, pink } from '../../constants/colors';

export function UserCard({ userData }: { userData: TUserData }) {
    const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();

    return (
        <Pressable onPress={() => navigate('CommunityProfile', { userID: userData.id})}>
            <View style={stylesUserCard.container}>
                <Avatar title={userData.nickname[0].toUpperCase()} size={'large'} rounded
                    titleStyle={{ fontSize: 24, fontFamily: 'Montserrat700' }} 
                    containerStyle={stylesProfileScreen.avatar} />
                <View style={stylesBookLibCard.container_info_book}>
                    <Text style={stylesUserCard.name}>{userData.nickname}</Text>
                    <Text style={stylesUserCard.countBook}>{userData.userBooks.length} книг</Text>
                    <Text style={stylesUserCard.genre}>Любимый жанр: 
                        <Text style={{color:pink}}> {userData.favGenre}</Text>
                    </Text>
                    <Text style={stylesUserCard.author}>Любимый автор:
                        <Text style={{color:deepBlue}}> {userData.favAuthor}</Text>
                    </Text>
                </View >
            </View >
        </Pressable >
    )
}