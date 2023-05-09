import { View, Text, ImageBackground, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { srcIcnBooks, srcIcnCloudCry, srcIcnOpenBook, srcIcnPage, srcIcnReward, srcImgProfileHeader } from '../constants/images';
import { stylesProfileScreen } from './stylesScreen';
import { Avatar } from 'react-native-elements';
import { deepBlue, lightBlue } from '../constants/colors';
import { ProfileStackParams, TUserData } from '../types';
import { BookProfileCard } from '../components/BookProfileCard';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getUserDataAS } from '../service/asyncStorage';
import { achievements } from '../AppData/achievements';

type ProfileParams = {
	userID: number;
}

export function CommunityProfileScreen() {
	const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();
	const { userID } = useRoute<RouteProp<Record<string, ProfileParams>, string>>().params; // get user id from params

	const [userData, setUserData] = useState<TUserData | null>(null);
	const [pins, setPins] = useState<JSX.Element[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getUserData();
	}, [])

	async function getUserData() {
		//use userID to get user data
		const data = await getUserDataAS();
		setUserData(data);

		// set achievements images
		const pinsArray = achievements
			.filter(item => data?.achievements[item.id])
			.slice(0, 5)
			.map(item => (<Image key={item.id} style={stylesProfileScreen.img_pin} source={item.img} />));
		setPins(pinsArray);
		setIsLoading(false);
	}

	async function subscribe() {
		setIsLoading(true);
		// handle sub
		await getUserData();
		setIsLoading(false);
	}

	return (
		<>
			{isLoading
				?
				<View style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size={'large'} color={deepBlue} />
				</View>
				:
				<>
					{!userData
						?
						<View style={{ width: '100%', height: '100%', paddingLeft: 13, paddingRight: 13, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
							<Image style={{ width: 80, height: 80 }} source={srcIcnCloudCry} />
							<Text style={{ fontFamily: 'MontserratAlt400', fontSize: 20, textAlign: 'center' }}>Произошла ошибка, пожалуйста перезайдите в аккаунт</Text>
						</View>
						:
						<ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
							<View style={stylesProfileScreen.profile_page}>
								{/* Header */}
								<ImageBackground style={stylesProfileScreen.img_header} source={srcImgProfileHeader}>
									<Avatar title={userData.nickname[0].toUpperCase()} size={'large'}
										rounded
										titleStyle={{ fontSize: 32, fontFamily: 'Montserrat700' }} containerStyle={stylesProfileScreen.avatar} />
									<View style={stylesProfileScreen.container_avatar_points}>
										<Text style={stylesProfileScreen.text_name}>{userData.nickname}</Text>
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>

											{/* Pages stats */}
											<Image style={[stylesProfileScreen.icn_points, { marginRight: 6 }]} source={srcIcnPage} />
											<Text style={stylesProfileScreen.text_points}>{userData.readPagesNum}</Text>

											{/* Books stats */}
											<Image style={[stylesProfileScreen.icn_points, { marginLeft: 20 }]} source={srcIcnBooks} />
											<Text style={stylesProfileScreen.text_points}>{userData.userBooks.length}</Text>
										</View>
									</View>
								</ImageBackground>

								{/* Subscriptions */}
								<Pressable onPress={subscribe} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: lightBlue }}>
									<Text style={{ fontFamily: 'MontserratAlt700', color: 'white', fontSize: 18 }}>{userData.isSub ? 'Отписаться' : 'Подписаться'}</Text>
								</Pressable>

								{/* Favorites */}
								{/* FIXME change to this after backend will be ready */}
								{/* <Text style={stylesProfileScreen.text_points}>Любимый жанр: {userData.favGenre}</Text>
								<Text style={stylesProfileScreen.text_points}>Любимый автор: {userData.favAuthor}</Text> */}
								<View style={{ margin: 10 }}>
									<Text>Любимый жанр: Роман</Text>
									<Text>Любимый автор: Федор Достоевский</Text>
								</View>

								{/* Achievements */}
								<Pressable onPress={() => navigate('Achievements')} style={stylesProfileScreen.container_achievements}>
									<Text style={stylesProfileScreen.h1_profile_bold}>Достижения:
										<Text style={stylesProfileScreen.h1_profile_medium}> {pins.length}</Text>
									</Text>
									{pins.length === 0
										?
										<View style={stylesProfileScreen.empty_component_achiv}>
											<Image style={{ width: 44, height: 44 }} source={srcIcnReward} />
											<Text style={stylesProfileScreen.text_empry}>Пользователь пока не получил ни одного достижения</Text>
										</View>
										:
										<View style={stylesProfileScreen.wrapper_pins}>
											{pins}
										</View>
									}

								</Pressable>

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
											<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
												<Image style={{ width: 55, height: 55 }} source={srcIcnOpenBook} />
												<Text style={stylesProfileScreen.empty_text}>Пользователя пока не приобрел ни одной книги</Text>
											</View>
										}
									</View>
								</View>
							</View>
						</ScrollView>
					}
				</>
			}
		</>
	)
}