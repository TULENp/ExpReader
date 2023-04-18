import { View, Text, ImageBackground, Image, ScrollView, Pressable, FlatList, Button, StatusBar } from 'react-native';
import React, { useContext, useState } from 'react';
import { srcIcnOpenBook, srcIcnPoints, srcIcnReward, srcIcnSetting, srcImgProfileHeader } from '../constants/images';
import { stylesProfileScreen } from './stylesScreen';
import { Avatar } from 'react-native-elements';
import { LinearProgress } from '@rneui/themed';
import { deepBlue, greenRarity, white } from '../constants/colors';
import { ProfileStackParams, TDailyTask, TPin, TUserData } from '../types';
import { pins } from '../TestData/pins';
import { BookProfileCard } from '../components/BookProfileCard';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { getDailyTaskLevel } from '../service/motivation';
import { clearTokenAS, getDailyTaskAS, getTodayPagesAS, getUserDataAS, setUserDataAS } from '../service/asyncStorage';
import { AppContext } from '../context/AppContext';
import { GetUserData } from '../service/api';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

export function ProfileScreen() {
	const { setIsAuthorized, netInfo } = useContext(AppContext);
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
			console.log(userData);
		}, [])
	);

	async function getUserData() {
		let data = null;
		//FIXME //! remove '!' to invert boolean expression after updateDB func is ready
		if (netInfo?.isInternetReachable) {
			//get data from backend
			const result = await GetUserData();
			if (typeof result == "number") return; //TODO throw error message
			// if data is ok save it to AS and set state
			data = result
			setUserDataAS(result);
		}
		else {
			//get data from AS and set state
			data = await getUserDataAS();
		}
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
				? <Text>Пользователь не найден</Text>
				:
				<ScrollView style={{backgroundColor:'white', flex:1}}>
					<View style={stylesProfileScreen.profile_page}>
					{/* <StatusBar  backgroundColor={deepBlue}/> */}
						{/* Header */}
						<ImageBackground style={stylesProfileScreen.img_header} source={srcImgProfileHeader}>
							<Avatar title={userData.nickname[0]} size={'large'} 
								rounded
								titleStyle={{ fontSize: 32, fontFamily: 'Montserrat700' }} containerStyle={stylesProfileScreen.avatar} />
							<View style={stylesProfileScreen.container_avatar_points}>
								<Text style={stylesProfileScreen.text_name}>{userData.nickname}</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Image style={stylesProfileScreen.icn_points} source={srcIcnPoints} />
									<Text style={stylesProfileScreen.text_points}>{userData.readPagesNum}</Text>
								</View>
							</View>
							<Feather name="log-out" onPress={LogOut} style={{position:'absolute', top:10, right:10}} size={28} color="white" />
						</ImageBackground>

						{/* Daily task */}
						<Pressable style={stylesProfileScreen.test}>
							<Pressable style={stylesProfileScreen.container_level} onPress={() => navigate('DailyTask', { todayPages })}>
								<View style={stylesProfileScreen.wrapper_text_level_settings}>
									{/* FIXME //! level is not updating */}
									<Text style={stylesProfileScreen.text_level_bold}>Уровень:
										<Text style={[stylesProfileScreen.text_level_medium, { color: greenRarity }]}> {dailyTaskLevel}</Text>
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
						{/* FIXME add render to 0 achievements */}
						<Pressable onPress={() => navigate('Achievements')}>
							<View style={stylesProfileScreen.container_achievements}>
								<Text style={stylesProfileScreen.h1_profile_bold}>Достижения:
									{/* {userData.achievesImg.length} */}
									<Text style={stylesProfileScreen.h1_profile_medium}> 5 (хард код)</Text>
								</Text>
								<View style={stylesProfileScreen.wrapper_pins}>
									<FlatList
									style={{width:'100%', backgroundColor:'white', padding:13,borderRadius:8,}}
									contentContainerStyle={{justifyContent:'center', alignItems:'center', width:'100%', }}
									showsHorizontalScrollIndicator={false}
										scrollEnabled={false}
										horizontal
										data={userData.achievesImg}
										keyExtractor={(item) => item}
										renderItem={(item) =>
											<Image style={stylesProfileScreen.img_pin} source={require('../../assets/owlPin.png')} />
										}
										ListEmptyComponent={()=>
											<View style={stylesProfileScreen.empty_component_achiv}>
												<Image style={{width:44, height:44}} source={srcIcnReward}/>
												<Text style={stylesProfileScreen.text_empry}>Вы пока не получили ни одного достижения</Text>
											</View>}	
									/>
								</View>
							</View>
						</Pressable>

						{/* Book shelf */}
						<View style={stylesProfileScreen.container_bookshelf}>
							<Text style={stylesProfileScreen.h1_profile_bold}>Полка:
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