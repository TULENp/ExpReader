import { View, Text, Button, ScrollView, StatusBar, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNewDailyTaskAS, setDailyTaskAS } from '../service/asyncStorage'
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
	const [dailyTask, setDailyTask] = useState<TDailyTask>();
	const { goBack } = useNavigation<NavigationProp<ProfileStackParams>>();

	// const [activeContaner,setActiveContainer] = useState<number>();

	useEffect(() => {
		getDailyTask();
	}, [])

	async function getDailyTask() {
		const dailyTask: TDailyTask = await getNewDailyTaskAS();
		setDailyTask(dailyTask);
	}

	function changeDailyTask(dailyTask: TDailyTask) {
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
						<Text style={stylesCheckoutScreen.text_header}>Ежедневная цель</Text>
					</View>

					{/* Daily Tasks */}
					<View style={stylesDailyTaskScreen.wrapper_containers}>
						<Pressable onPress={() => changeDailyTask(60)}>
							<View style={{ alignItems: 'center' }}>
								<View style={[{ backgroundColor: greenRarity },
								dailyTask === 60 ? stylesDailyTaskScreen.container_daily_task_active : stylesDailyTaskScreen.container_daily_task]}>
									<Text style={stylesDailyTaskScreen.text_bold_large}>60</Text>
									<Text style={stylesDailyTaskScreen.text_medium}>страниц в день</Text>
								</View>
								<Text style={stylesDailyTaskScreen.text_bold_medium}>Лёгкий</Text>
							</View>
						</Pressable>

						<Pressable onPress={() => changeDailyTask(120)}>
							<View style={{ alignItems: 'center' }}>
								<View style={[{ backgroundColor: blueRarity },
								dailyTask === 120 ? stylesDailyTaskScreen.container_daily_task_active : stylesDailyTaskScreen.container_daily_task]}>
									<Text style={stylesDailyTaskScreen.text_bold_large}>120</Text>
									<Text style={stylesDailyTaskScreen.text_medium}>страниц в день</Text>
								</View>
								<Text style={stylesDailyTaskScreen.text_bold_medium}>Средний</Text>
							</View>
						</Pressable>

						<Pressable onPress={() => changeDailyTask(240)}>
							<View style={{ alignItems: 'center' }}>
								<View style={[{ backgroundColor: redRarity },
								dailyTask === 240 ? stylesDailyTaskScreen.container_daily_task_active : stylesDailyTaskScreen.container_daily_task]}>
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
						<Text style={stylesDailyTaskScreen.text_description}>
							Ваша ежедневная цель будет обновлена с завтрашнего дня или если вы сегодня еще ничего не прочитали
						</Text>
					</View>
				</ScrollView>
			</View>
		</>
	)
}