
import React, { useEffect } from 'react';
import { TabNavigation } from './src/navigation/TabNavigation';
import { setBookStatsAS, setBookNamesAS, setTodayAS, setUserDataAS } from './src/service/asyncStorage';
import { GetAllLibBooks, GetUserData } from './src/service/api';

export default function App() {

	useEffect(() => {
		setTodayAS();
		getUserData();
		getAllLibBooks();
	}, [])

	async function getUserData() {
		const result = await GetUserData();
		if (typeof result !== "string") {
			setUserDataAS(result);
		}
	}

	async function getAllLibBooks() {
		const booksArray = await GetAllLibBooks();
		if (typeof booksArray !== "string") {
			const bookNames: string[] = [];
			for (let book of booksArray) {
				setBookStatsAS(book);
				bookNames.push((book.id).toString());
			}
			setBookNamesAS(bookNames);
		}
	}

	return (
		<TabNavigation />
	);
}