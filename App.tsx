
import React, { useEffect } from 'react';
import { TabNavigation } from './src/navigation/TabNavigation';
import { setTodayAS, setUserDataAS } from './src/service/asyncStorage';
import { GetUserData } from './src/service/api';

export default function App() {

	useEffect(() => {
		setTodayAS();
		getUserData();
	}, [])

	async function getUserData() {
		const result = await GetUserData();
		if (typeof result !== "string") {
			setUserDataAS(result);
		}
	}

	return (
		<TabNavigation />
	);
}