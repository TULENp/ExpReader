import { View, Text, ImageBackground, Image, ScrollView, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import { srcIcnOpenBook, srcIcnPoints, srcIcnReward, srcImgProfileHeader } from '../constants/images';
import { stylesProfileScreen } from './stylesScreen';
import { Avatar } from 'react-native-elements';
import { LinearProgress } from '@rneui/themed';
import { greenRarity } from '../constants/colors';
import { ProfileStackParams, TDailyTask, TDailyTaskLevel, TUserData } from '../types';
import { BookProfileCard } from '../components/BookProfileCard';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { getDailyTaskLevel } from '../service/motivation';
import { clearTokenAS, getDailyTaskAS, getTodayPagesAS, getUserDataAS } from '../service/asyncStorage';
import { AppContext } from '../context/AppContext';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { achievements } from '../TestData/achievements';

export function ProfileScreen() {
	const { setIsAuthorized, isGotBackend } = useContext(AppContext);
	const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();

	const [userData, setUserData] = useState<TUserData | null>(null);
	const [todayPages, setTodayPages] = useState<number>(0);
	const [dailyTaskPages, setDailyTaskPages] = useState<TDailyTask>(60);
	const [dailyTaskLevel, setDailyTaskLevel] = useState<TDailyTaskLevel>();
	const [pins, setPins] = useState<JSX.Element[]>([]);

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

		// set achievements images
		const pinsArray = achievements
			.filter(item => data?.achievements[item.id])
			.slice(0, 5)
			.map(item => (<Image key={item.id} style={stylesProfileScreen.img_pin} source={item.img} />));
		setPins(pinsArray);
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

	function LogOut() {
		clearTokenAS();
		setIsAuthorized(false);
	}


	return (
		<>
			{!userData
				? <Text>Пользователь не найден</Text>
				:
				<ScrollView style={{backgroundColor:'white', flex:1}}>
					<View style={stylesProfileScreen.profile_page}>
					{/* <StatusBar  backgroundColor={deepBlue}/> */}
						{/* Header */}
						<ImageBackground style={stylesProfileScreen.img_header} source={srcImgProfileHeader}>
							<Avatar title={userData.nickname[0].toUpperCase()} size={'large'} 
								rounded
								titleStyle={{ fontSize: 32, fontFamily: 'Montserrat700'}} containerStyle={stylesProfileScreen.avatar} />
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
						<Pressable style={stylesProfileScreen.test}>
							<Pressable style={stylesProfileScreen.container_level} onPress={() => navigate('DailyTask', { todayPages })}>
								<View style={stylesProfileScreen.wrapper_text_level_settings}>
									<Text style={stylesProfileScreen.text_level_bold}>Уровень:
										<Text style={[stylesProfileScreen.text_level_medium, { color: dailyTaskLevel?.color }]}> {dailyTaskLevel?.level}</Text>
									</Text>
									<Ionicons  name="settings-outline" size={24} color={'black'} />
								</View>
								<LinearProgress value={todayPages / dailyTaskPages} color={greenRarity} style={stylesProfileScreen.progress_bar} trackColor={'#D8D8D8'} variant='determinate' />
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
							</Pressable>
						</Pressable>

						{/* Achievements */}
						{/* FIXME fix achieves display styles */}
						<Pressable onPress={() => navigate('Achievements')}>
							<View style={stylesProfileScreen.container_achievements}>
								{pins.length === 0
									?
									<View style={stylesProfileScreen.wrapper_pins}>
										<View style={stylesProfileScreen.empty_component_achiv}>
											<Image style={{ width: 44, height: 44 }} source={srcIcnReward} />
											<Text style={stylesProfileScreen.text_empry}>Вы пока не получили ни одного достижения</Text>
										</View>
									</View>
									:
									<>
										<Text style={stylesProfileScreen.h1_profile_bold}>Достижения:
											<Text style={stylesProfileScreen.h1_profile_medium}> {pins.length}</Text>
										</Text>
										<View style={stylesProfileScreen.wrapper_pins}>
											{pins}
										</View>
									</>
								}
							</View>
							{/* <Text style={stylesProfileScreen.h1_profile_bold}>Достижения:
							<Text style={stylesProfileScreen.h1_profile_medium}> 5 (хард код)</Text>
						</Text>
						<View style={stylesProfileScreen.wrapper_pins}>
							<FlatList
								style={{ width: '100%', backgroundColor: 'white', padding: 13, borderRadius: 8, }}
								contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', width: '100%', }}
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
						</View> */}
						</Pressable>

						{/* TODO add empty check */}
						{/* Book shelf */}
						<View style={stylesProfileScreen.container_bookshelf}>
							<Text style={stylesProfileScreen.h1_profile_bold}>Книжная полка:
								<Text style={stylesProfileScreen.h1_profile_medium}> {userData.userBooks.length}</Text>
							</Text>
							<View style={stylesProfileScreen.container_profile_books}>
								{userData.userBooks.length !== 0
									?
									userData.userBooks.map((book) => (
										<BookProfileCard key={book.id} book={book} />
									))
									:
									<View style={{justifyContent:'center', alignItems:'center', padding:13}}>
										<Image style={{width:55, height:55}} source={srcIcnOpenBook}/>
										<Text style={stylesProfileScreen.empty_text}>Вы ещё не прочитали ни одной книги</Text>
									</View>

								}
							</View>
						</View>
					</View>
				</ScrollView>
			}
		</>
	)
}