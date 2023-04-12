
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native'
import { TabNavigation } from './src/navigation/TabNavigation';
import { getTokenAS } from './src/service/asyncStorage';
import { AuthNavigation } from './src/navigation/AuthNavigation';
import { AppContext } from './src/context/AppContext';

export default function App() {
	//FIXME //! fix app loading time and render
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		checkLogin();
	}, [isAuth])

	async function checkLogin() {
		const token = await getTokenAS();
		setIsAuth(token ? true : false);
		setIsLoading(false);
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