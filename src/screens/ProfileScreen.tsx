import { View, Text, ImageBackground, Image, ScrollView, Pressable, FlatList } from 'react-native';
import React, { useContext, useState } from 'react';
import { srcIcnPoints, srcIcnReward, srcIcnSetting, srcImgProfileHeader } from '../constants/images';
import { stylesProfileScreen } from './stylesScreen';
import { Avatar } from 'react-native-elements';
import { LinearProgress } from '@rneui/themed';
import { greenRarity, white } from '../constants/colors';
import { ProfileStackParams, TDailyTask, TDailyTaskLevel, TUserData } from '../types';
import { BookProfileCard } from '../components/BookProfileCard';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { getDailyTaskLevel } from '../service/motivation';
import { clearTokenAS, getDailyTaskAS, getTodayPagesAS, getUserDataAS } from '../service/asyncStorage';
import { AppContext } from '../context/AppContext';
import { Feather } from '@expo/vector-icons';

export function ProfileScreen() {
	const { setIsAuthorized, isGotBackend } = useContext(AppContext);
	const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();

	const [userData, setUserData] = useState<TUserData | null>(null);
	const [todayPages, setTodayPages] = useState<number>(0);
	const [dailyTaskPages, setDailyTaskPages] = useState<TDailyTask>(60);
	const [dailyTaskLevel, setDailyTaskLevel] = useState<TDailyTaskLevel>();

	useFocusEffect(
		React.useCallback(() => {
			if (isGotBackend) {
				getUserData();
			}
			getTodayPages();
			getDailyTask();
		}, [isGotBackend])
	);

	//FIXME data can be received from AS before than from DB
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
		setDailyTaskLevel(getDailyTaskLevel(dailyTask));
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
				? <Text>Пользователь не найден</Text>
				:
				<ScrollView >
					<View style={stylesProfileScreen.profile_page}>

						{/* Header */}
						<ImageBackground style={stylesProfileScreen.img_header} source={srcImgProfileHeader}>
							<Avatar title={userData.nickname[0]} size={'large'} rounded
								titleStyle={{ fontSize: 32, fontFamily: 'Montserrat700' }} containerStyle={stylesProfileScreen.avatar} />
							<View style={stylesProfileScreen.container_avatar_points}>
								<Text style={stylesProfileScreen.text_name}>{userData.nickname}</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Image style={stylesProfileScreen.icn_points} source={srcIcnPoints} />
									<Text style={stylesProfileScreen.text_points}>{userData.readPagesNum}</Text>
								</View>
							</View>
							<Feather name="log-out" onPress={LogOut} style={{ position: 'absolute', top: 10, right: 10 }} size={28} color="white" />
						</ImageBackground>

						{/* Daily task */}
						<Pressable onPress={() => navigate('DailyTask', { todayPages })}>
							<View style={stylesProfileScreen.container_level}>
								<View style={stylesProfileScreen.wrapper_text_level_settings}>
									{/* FIXME //! level is not updating */}
									<Text style={stylesProfileScreen.text_level_bold}>Уровень:
										<Text style={[stylesProfileScreen.text_level_medium, { color: dailyTaskLevel?.color }]}> {dailyTaskLevel?.level}</Text>
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
						{/* FIXME add render to 0 achievements */}
						<Pressable onPress={() => navigate('Achievements')}>
							<View style={stylesProfileScreen.container_achievements}>
								<Text style={stylesProfileScreen.h1_profile_bold}>Достижения:
									{/* {userData.achievesImg.length} */}
									<Text style={stylesProfileScreen.h1_profile_medium}> 5 (хард код)</Text>
								</Text>
								<View style={stylesProfileScreen.wrapper_pins}>
									<FlatList
										showsHorizontalScrollIndicator={false}
										scrollEnabled={false}
										horizontal
										data={userData.achievesImg}
										keyExtractor={(item) => item}
										renderItem={(item) =>
											<Image style={stylesProfileScreen.img_pin} source={require('../../assets/owlPin.png')} />
										}
										ListEmptyComponent={() =>
											<View style={stylesProfileScreen.empty_component_achiv}>
												<Image style={{ width: 44, height: 44 }} source={srcIcnReward} />
												<Text style={stylesProfileScreen.text_empry}>Вы пока не получили ни одного достижения</Text>
											</View>}
									/>
								</View>
							</View>
						</Pressable>

						{/* Book shelf */}
						<View style={stylesProfileScreen.container_bookshelf}>
							<Text style={stylesProfileScreen.h1_profile_bold}>Полка:
								<Text style={stylesProfileScreen.h1_profile_medium}> 5</Text>
							</Text>
							<View style={stylesProfileScreen.container_profile_books}>
								{userData.userBooks.map((book) => (
									<BookProfileCard key={book.id} book={book} />
								))}
							</View>
						</View>
					</View>
				</ScrollView>
			}
		</>
	)
}