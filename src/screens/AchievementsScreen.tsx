import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { pins } from '../TestData/pins'
import { stylesAchievementsScreen, stylesCheckoutScreen } from './stylesScreen'
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ProfileStackParams } from '../types';
import { getAchievesStatusAS } from '../service/asyncStorage';

export function AchievementsScreen() {
	const { goBack } = useNavigation<NavigationProp<ProfileStackParams>>();
	const [achievesStatus, setAchievesStatus] = useState<boolean[]>();

	useEffect(() => {
		getAchievesStatus()
	}, [])

	async function getAchievesStatus() {
		const status = await getAchievesStatusAS();
		setAchievesStatus(status);
	}

	return (
		<>
			<View style={stylesAchievementsScreen.achievements_page}>
				{/* Header */}
				<View style={[stylesCheckoutScreen.container_header, { paddingLeft: 13 }]}>
					<TouchableOpacity onPress={() => goBack()}
					>
						<MaterialIcons name="keyboard-backspace"
							size={36}
							color="black"
						/>
					</TouchableOpacity>
					<Text style={stylesCheckoutScreen.text_header}>Достижения</Text>
				</View>

				{/* Achievements list */}
				{achievesStatus &&
					// TODO change style depends on isCompleted
					<FlatList data={pins}
						keyExtractor={item => item.id.toString()}
						renderItem={({ item }) => {
							return (
								<View style={stylesAchievementsScreen.container_achiv} key={item.id}>
									<View style={stylesAchievementsScreen.wrapper_pin}>
										<Image style={{ width: 80, height: 80 }} source={item.img} />
									</View>
									<View style={stylesAchievementsScreen.wrapper_pin_info}>
										<Text style={stylesAchievementsScreen.title}>{item.title}</Text>
										<Text style={stylesAchievementsScreen.author}>{item.description}</Text>
										<Text style={stylesAchievementsScreen.title}>{achievesStatus[item.id] ? 'Выполнено' : 'Не выполнено'}</Text>
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