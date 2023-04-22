
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
	const [isGotBackend, setIsGotBackend] = useState(false);
	const netInfo = useNetInfo();
	
	useEffect(() => {
		checkLogin();
		createDirs();
	}, [isAuth])

	async function checkLogin() {
		const token = await getTokenAS();
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
		<AppContext.Provider value={{ isGotBackend: isGotBackend, setIsGotBackend: setIsGotBackend, netInfo: netInfo, setIsAuthorized: setIsAuth, }}>
			<>
				{isLoading
					?
					<AppLoading />
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