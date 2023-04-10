import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { pins } from '../TestData/pins'
import { stylesAchievementsScreen, stylesCheckoutScreen } from './stylesScreen'
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ProfileStackParams } from '../types';
import { deepBlue } from '../constants/colors';

export function AchievementsScreen() {

	const { goBack } = useNavigation<NavigationProp<ProfileStackParams>>();

	const listAchievments = pins.map((item) =>
		<View style={stylesAchievementsScreen.container_achiv}>
			<View style={stylesAchievementsScreen.wrapper_pin}>
				<Image style={{ width: 80, height: 80 }} source={item.img} />
			</View>
			<View style={stylesAchievementsScreen.wrapper_pin_info}>
				<Text style={stylesAchievementsScreen.title}>{item.title}</Text>
				<Text style={stylesAchievementsScreen.author}>{item.description}</Text>
			</View>
		</View>)

	return (
		<>
			<View style={stylesAchievementsScreen.achievements_page}>
				<ScrollView>

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
					<View style={{ marginTop: 20 }}>
						{listAchievments}
					</View>
				</ScrollView>
			</View>
		</>
	)
}