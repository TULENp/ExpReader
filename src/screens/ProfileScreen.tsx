import { View, Text, ImageBackground, Image, ScrollView, Pressable, FlatList, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { srcIcnPoints, srcIcnSetting, srcImgProfileHeader } from '../constants/images'
import { stylesProfileScreen } from './stylesScreen'
import { Avatar } from 'react-native-elements'
import { LinearProgress } from '@rneui/themed'
import { greenRarity, white } from '../constants/colors'
import { ProfileStackParams, TDailyTask, TPin, TUserData } from '../types'
import { pins } from '../TestData/pins'
import { BookProfileCard } from '../components/BookProfileCard'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { getDailyTaskLevel } from '../service/motivation'
import { clearTokenAS, getDailyTaskAS, getTodayPagesAS, getUserDataAS } from '../service/asyncStorage'
import { AppContext } from '../context/AppContext'

export function ProfileScreen() {
	const { setIsAuthorized } = useContext(AppContext);
	const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();

	const [userData, setUserData] = useState<TUserData | null>(null);
	const [todayPages, setTodayPages] = useState<number>(0);
	const [dailyTaskPages, setDailyTaskPages] = useState<TDailyTask>(60);
	const [dailyTaskLevel, setDailyTaskLevel] = useState<string>('');

	useFocusEffect(
		React.useCallback(() => {
			getUserData();
			getTodayPages();
			getDailyTask();
			setDailyTaskLevel(getDailyTaskLevel(dailyTaskPages));
		}, [])
	);

	async function getUserData() {
		const data = await getUserDataAS();
		setUserData(data);
	}

	async function getTodayPages() {
		const todayPages = await getTodayPagesAS();
		setTodayPages(todayPages);
	}

	async function getDailyTask() {
		const dailyTask = await getDailyTaskAS();
		setDailyTaskPages(dailyTask);
	}

	//return first five pins
	// const firstFivePins: JSX.Element[] = pins.slice(0, 5).map(item => {
	// 	return <Image style={stylesProfileScreen.img_pin} source={item.img} />;
	// });

	function LogOut() {
		clearTokenAS();
		setIsAuthorized(false);
	}

	return (
		<>
			{!userData
				? <Pressable onPress={() => navigate('Achievements')}><Text>Пользователь не найден</Text></Pressable>
				:
				<ScrollView >
					<Button title='Выйти' onPress={LogOut} />
					<View style={stylesProfileScreen.profile_page}>

						{/* Header */}
						<ImageBackground style={stylesProfileScreen.img_header} source={srcImgProfileHeader}>
							<Avatar titleStyle={{ fontSize: 32, fontFamily: 'Montserrat700' }} size={'large'} containerStyle={stylesProfileScreen.avatar} rounded title='И' />
							<View style={stylesProfileScreen.container_avatar_points}>
								<Text style={stylesProfileScreen.text_name}>{userData.nickname}</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Image style={stylesProfileScreen.icn_points} source={srcIcnPoints} />
									<Text style={stylesProfileScreen.text_points}>{userData.readPagesNum}</Text>
								</View>
							</View>
						</ImageBackground>

						{/* Daily task */}
						<Pressable onPress={() => navigate('DailyTask', { todayPages })}>
							<View style={stylesProfileScreen.container_level}>
								<View style={stylesProfileScreen.wrapper_text_level_settings}>
									{/* FIXME //! level is not updating */}
									<Text style={stylesProfileScreen.text_level_bold}>Уровень:
										<Text style={[stylesProfileScreen.text_level_medium, { color: greenRarity }]}> {dailyTaskLevel}</Text>
									</Text>
									<Image style={stylesProfileScreen.icn_settings} source={srcIcnSetting} />
								</View>
								<LinearProgress value={todayPages / dailyTaskPages} color={greenRarity} style={stylesProfileScreen.progress_bar} trackColor={white} variant='determinate' />
								{todayPages >= dailyTaskPages
									?
									<>
										<Text style={stylesProfileScreen.text_level_light}>Задание выполнено! Получено: {dailyTaskPages} очков чтения</Text>
										<Text style={stylesProfileScreen.text_level_light}>За сегодня прочитано: {todayPages}</Text>
									</>
									:
									<>
										<Text style={stylesProfileScreen.text_level_light}>Прочитано сегодня {todayPages} / {dailyTaskPages} страниц</Text>
									</>
								}
							</View>
						</Pressable>

						{/* Achievements */}
						<View style={stylesProfileScreen.container_achievements}>
							<Text style={stylesProfileScreen.h1_profile_bold}>Достижения:
								<Text style={stylesProfileScreen.h1_profile_medium}> {userData.achievesImg.length}</Text>
							</Text>
							<View style={stylesProfileScreen.wrapper_pins}>
								<FlatList
									horizontal
									data={userData.achievesImg}
									keyExtractor={(item) => item}
									renderItem={(item) =>
										<Image style={stylesProfileScreen.img_pin} source={require('../../assets/owlPin.png')} />
									}
								/>
							</View>
						</View>

						{/* Book shelf */}
						<View style={stylesProfileScreen.container_bookshelf}>
							<Text style={stylesProfileScreen.h1_profile_bold}>Полка:
								<Text style={stylesProfileScreen.h1_profile_medium}> 5</Text>
							</Text>
							<View style={stylesProfileScreen.container_profile_books}>
								{/* FIXME //! don't use flatList in scrollView */}
								<FlatList
									data={userData.userBooks}
									keyExtractor={(item) => item.id}
									renderItem={({ item }) =>
										<BookProfileCard book={item} />
									} />
							</View>
						</View>

					</View>
				</ScrollView>
			}
		</>
	)
}