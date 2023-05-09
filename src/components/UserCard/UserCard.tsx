import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { ProfileStackParams, TUserData } from '../../types';
import { stylesBookLibCard } from '../BookLibCard/style';
import { stylesProfileScreen } from '../../screens/stylesScreen';

export function UserCard({ userData }: { userData: TUserData }) {
    const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();

    return (
        <Pressable onPress={() => navigate('CommunityProfile', { userID: userData.id})}>
            <View style={stylesBookLibCard.container_lib_book}>
                <Avatar title={userData.nickname[0].toUpperCase()} size={'large'} rounded
                    titleStyle={{ fontSize: 32, fontFamily: 'Montserrat700' }} containerStyle={stylesProfileScreen.avatar} />
                <View style={stylesBookLibCard.container_info_book}>
                    <Text >{userData.nickname}</Text>
                    <Text >{userData.userBooks.length}</Text>
                    <Text>Любимый жанр: {userData.favGenre}</Text>
                    <Text>Любимый автор: {userData.favAuthor}</Text>
                </View >
            </View >
        </Pressable >
    )
}