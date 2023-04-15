
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native'
import { TabNavigation } from './src/navigation/TabNavigation';
import { getTokenAS } from './src/service/asyncStorage';
import { AuthNavigation } from './src/navigation/AuthNavigation';
import { AppContext } from './src/context/AppContext';
import * as FileSystem from 'expo-file-system';
import { coversDir, booksDir } from './src/constants';
import { Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, } from '@expo-google-fonts/montserrat'
import { MontserratAlternates_300Light, MontserratAlternates_400Regular, MontserratAlternates_500Medium, MontserratAlternates_700Bold, } from '@expo-google-fonts/montserrat-alternates'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNetInfo } from '@react-native-community/netinfo';

export default function App() {

	let [fontsLoaded] = useFonts({
		'Montserrat300': Montserrat_300Light,
		'Montserrat400': Montserrat_400Regular,
		'Montserrat500': Montserrat_500Medium,
		'Montserrat700': Montserrat_700Bold,
		'MontserratAlt300': MontserratAlternates_300Light,
		'MontserratAlt400': MontserratAlternates_400Regular,
		'MontserratAlt500': MontserratAlternates_500Medium,
		'MontserratAlt700': MontserratAlternates_700Bold,
	})
	//FIXME //! fix app loading time and render
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const netInfo = useNetInfo();


	useEffect(() => {
		checkLogin();
		createDirs();
	}, [isAuth])

	async function checkLogin() {
		
		const token = await getTokenAS();
		//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImxvZyIsInVzZXJJZCI6NCwiaWF0IjoxNjgxNDE3MTg4LCJleHAiOjE2ODE1MDM1ODh9.jQnYCA3esxpqnZ7joYWM4Nfk6jXwAAk8UPjFwYLtUdM
		//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImxvZyIsInVzZXJJZCI6NCwiaWF0IjoxNjgxNTg1Mzg3LCJleHAiOjE2ODE2NzE3ODd9.kOErZFS3oaSccRQeiNa5UX9_0u-p-dHEP47PtjIXqlA
		setIsAuth(token ? true : false);
		setIsLoading(false);
	}

	async function createDirs() {
		if (!(await FileSystem.getInfoAsync(booksDir)).exists) {
			await FileSystem.makeDirectoryAsync(booksDir);
		}
		if (!(await FileSystem.getInfoAsync(coversDir)).exists) {
			await FileSystem.makeDirectoryAsync(coversDir);
		}
	}

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<AppContext.Provider value={{ setIsAuthorized: setIsAuth, netInfo: netInfo }}>
			<>
				{isLoading
					?
					<Text style={{ alignSelf: 'center', fontSize: 50 }}>Загрузка...</Text>
					:
					<>
						{isAuth
							? <TabNavigation />
							: <AuthNavigation />
						}
					</>
				}
			</>
		</AppContext.Provider>
	);
}