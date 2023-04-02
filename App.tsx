
import React, { useEffect } from 'react';
import { TabNavigation } from './src/navigation/TabNavigation';
import { setTodayAS } from './src/service/asyncStorage';

export default function App() {

	useEffect(() => {
		setTodayAS();
	}, [])

	return (
		<TabNavigation />
	);
}