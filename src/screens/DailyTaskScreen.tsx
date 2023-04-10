import { View, Text, Button, ScrollView, StatusBar, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNewDailyTaskAS, setDailyTaskAS } from '../service/asyncStorage'
import { getDailyTaskLevel } from '../service/motivation';
import { ProfileStackParams, TDailyTask } from '../types';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { blueRarity, deepBlue, greenRarity, redRarity } from '../constants/colors';
import { stylesCheckoutScreen, stylesDailyTaskScreen } from './stylesScreen';
import { MaterialIcons, Feather } from '@expo/vector-icons';

type DailyTaskParams = {
	todayPages: number;
}
export function DailyTaskScreen() {
	const { todayPages } = useRoute<RouteProp<Record<string, DailyTaskParams>, string>>().params; // get today pages from params
	const [dailyTaskLevel, setDailyTaskLevel] = useState<string>();
	const { goBack } = useNavigation<NavigationProp<ProfileStackParams>>();

	// const [activeContaner,setActiveContainer] = useState<number>();

	useEffect(() => {
		getDailyTask();
	}, [])

	async function getDailyTask() {
		const dailyTask: TDailyTask = await getNewDailyTaskAS();
		const level: string = getDailyTaskLevel(dailyTask);
		setDailyTaskLevel(level);
	}

	function setDailyTask(dailyTask: TDailyTask) {
		setDailyTaskAS(dailyTask, todayPages);
		getDailyTask();
	}

	return (
		<>
			<View style={stylesDailyTaskScreen.daily_task_page}>
				<ScrollView>
					<StatusBar backgroundColor={deepBlue} />

					{/* Header */}
					<View style={stylesCheckoutScreen.container_header}>
						<TouchableOpacity onPress={() => goBack()}
						>
							<MaterialIcons name="keyboard-backspace"
								size={36}
								color="black"
							/>
						</TouchableOpacity>
						<Text style={stylesCheckoutScreen.text_header}>Ежедневные задания</Text>
					</View>

					{/* Daily Tasks */}
					<View style={stylesDailyTaskScreen.wrapper_containers}>
						<Pressable onPress={() => setDailyTask(60)}>
							<View style={{ alignItems: 'center' }}>
								<View style={[dailyTaskLevel === 'Легкий' ? stylesDailyTaskScreen.container_daily_task_active : stylesDailyTaskScreen.container_daily_task, { backgroundColor: greenRarity }]}>
									<Text style={stylesDailyTaskScreen.text_bold_large}>60</Text>
									<Text style={stylesDailyTaskScreen.text_medium}>страниц в день</Text>
								</View>
								<Text style={stylesDailyTaskScreen.text_bold_medium}>Лёгкий</Text>
							</View>
						</Pressable>

						<Pressable onPress={() => setDailyTask(120)}>
							<View style={{ alignItems: 'center' }}>
								<View style={[dailyTaskLevel === 'Нормальный' ? stylesDailyTaskScreen.container_daily_task_active : stylesDailyTaskScreen.container_daily_task, { backgroundColor: blueRarity }]}>
									<Text style={stylesDailyTaskScreen.text_bold_large}>120</Text>
									<Text style={stylesDailyTaskScreen.text_medium}>страниц в день</Text>
								</View>
								<Text style={stylesDailyTaskScreen.text_bold_medium}>Средний</Text>
							</View>
						</Pressable>

						<Pressable onPress={() => setDailyTask(240)}>
							<View style={{ alignItems: 'center' }}>
								<View style={[dailyTaskLevel === 'Серьезный' ? stylesDailyTaskScreen.container_daily_task_active : stylesDailyTaskScreen.container_daily_task, { backgroundColor: redRarity }]}>
									<Text style={stylesDailyTaskScreen.text_bold_large}>240</Text>
									<Text style={stylesDailyTaskScreen.text_medium}>страниц в день</Text>
								</View>
								<Text style={stylesDailyTaskScreen.text_bold_medium}>Серьёзный</Text>
							</View>
						</Pressable>
					</View>

					{/* Description */}
					<View style={{ flexDirection: 'row', marginTop: 40 }}>
						<Feather name="info" size={24} color="black" />
						<Text style={stylesDailyTaskScreen.text_description}>Изменения вступят в силу только на следующий день или если вы сегодня еще ничего не прочитали</Text>
					</View>
				</ScrollView>
			</View>
		</>
	)
}