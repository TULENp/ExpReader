import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { achievements } from '../TestData/achievements'
import { stylesAchievementsScreen, stylesCheckoutScreen } from './stylesScreen'
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ProfileStackParams } from '../types';
import { getUserAchievesAS } from '../service/asyncStorage';

export function AchievementsScreen() {
	const { goBack } = useNavigation<NavigationProp<ProfileStackParams>>();
	const [achieves, setAchieves] = useState<boolean[]>();

	useEffect(() => {
		getAchievesStatus()
	}, [])

	async function getAchievesStatus() {
		const status = await getUserAchievesAS();
		setAchieves(status);
	}

	return (
		<>
			<View style={stylesAchievementsScreen.achievements_page}>
				{/* Header */}
				<View style={[stylesCheckoutScreen.container_header, { paddingLeft: 13, marginBottom: 20 }]}>
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
				{achieves &&
					// TODO change style depends on isCompleted
					<FlatList data={achievements}
						keyExtractor={item => item.id.toString()}
						renderItem={({ item }) => {
							return (
								<View style={stylesAchievementsScreen.container_achiv} key={item.id}>
									<View style={[stylesAchievementsScreen.wrapper_pin, !achieves[item.id] && { backgroundColor: '#7A95A0' }]}>
										<Image style={{ width: 80, height: 80 }} source={item.img} />
									</View>
									<View style={[stylesAchievementsScreen.wrapper_pin_info, !achieves[item.id] && { backgroundColor: '#7A95A0' }]}>
										<Text style={stylesAchievementsScreen.title}>{item.title}</Text>
										<Text style={stylesAchievementsScreen.author}>{item.description}</Text>
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