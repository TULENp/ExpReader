
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native'
import { TabNavigation } from './src/navigation/TabNavigation';
import { setBookStatsAS, setBookNamesAS, setTodayAS, setUserDataAS, getTokenAS } from './src/service/asyncStorage';
import { GetAllLibBooks, GetUserData } from './src/service/api';
import { AuthNavigation } from './src/navigation/AuthNavigation';

export default function App() {

	const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

	useEffect(() => {
		checkLogin();
	}, [])

	async function checkLogin() {
		const token = await getTokenAS();
		if (token) {
			setIsAuthorized(true);
		}
	}

	return (
		<>
			{isAuthorized == null
				? <Text>Загрузка...</Text>
				:
				<>
					{isAuthorized
						? <TabNavigation />
						: <AuthNavigation />
					}
				</>
			}
		</>
	);
}