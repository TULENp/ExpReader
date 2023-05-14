
import React, { useEffect, useState } from 'react';
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
import { AdminNavigation } from './src/navigation/AdminNavigation';

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

	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	//TODO get isAdmin on auth
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
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
	console.log(isAdmin);

	return (
		<AppContext.Provider value={{
			isGotBackend: isGotBackend,
			setIsGotBackend: setIsGotBackend,
			netInfo: netInfo,
			setIsAuthorized: setIsAuth,
			setIsAdmin: setIsAdmin,
		}}>
			<>
				{isLoading
					?
					<AppLoading />
					:
					<>
						{!isAuth
							?
							<AuthNavigation />
							:
							(isAdmin
								? <AdminNavigation />
								: <TabNavigation />
							)
						}
					</>
				}
			</>
		</AppContext.Provider>
	);
}