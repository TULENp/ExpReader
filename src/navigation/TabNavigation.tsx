import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LibraryNavigation } from './LibraryNavigation';
import { ShopNavigation } from './ShopNavigation';
import { ProfileNavigation } from './ProfileNavigation';
import { Icon } from '@rneui/themed';
import { Feather } from '@expo/vector-icons';
import { black, deepBlue, white } from '../constants/colors';
import { useEffect } from 'react';
import { GetUserData, GetAllLibBooks } from '../service/api';
import { setTodayAS, setUserDataAS, setBookStatsAS, setBookNamesAS } from '../service/asyncStorage';

const Tab = createBottomTabNavigator();

export function TabNavigation() {

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
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { height: '8%' }, tabBarActiveTintColor: deepBlue, tabBarInactiveTintColor: black, tabBarHideOnKeyboard: true }} initialRouteName='LibraryTab'>
                <Tab.Screen name="ShopTab" component={ShopNavigation}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Feather name="shopping-cart" color={color} size={30} />
                        ),
                    }} />
                <Tab.Screen name="LibraryTab" component={LibraryNavigation}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Feather name="book" color={color} size={30} />
                        ),
                    }} />
                <Tab.Screen name="ProfileTab" component={ProfileNavigation}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Feather name="user" color={color} size={30} />
                        ),
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}