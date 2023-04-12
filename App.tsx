
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native'
import { TabNavigation } from './src/navigation/TabNavigation';
import { getTokenAS } from './src/service/asyncStorage';
import { AuthNavigation } from './src/navigation/AuthNavigation';
import { AppContext } from './src/context/AppContext';
import * as FileSystem from 'expo-file-system';
import { bookCoversDir, booksDir } from './src/constants';

export default function App() {
	//FIXME //! fix app loading time and render
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

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
		if (!(await FileSystem.getInfoAsync(bookCoversDir)).exists) {
			await FileSystem.makeDirectoryAsync(bookCoversDir);
		}
	}

	return (
		<AppContext.Provider value={{ setIsAuthorized: setIsAuth }}>
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