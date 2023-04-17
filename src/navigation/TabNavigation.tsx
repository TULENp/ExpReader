import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LibraryNavigation } from './LibraryNavigation';
import { ShopNavigation } from './ShopNavigation';
import { ProfileNavigation } from './ProfileNavigation';
import { Feather } from '@expo/vector-icons';
import { black, deepBlue } from '../constants/colors';
import { useEffect, useContext } from 'react';
import { setTodayAS } from '../service/asyncStorage';
import { GetAllLibBooks, GetUserData } from '../service/api';
import { AppContext } from '../context/AppContext';

const Tab = createBottomTabNavigator();

export function TabNavigation() {
    const { netInfo, setIsGotBackend } = useContext(AppContext)

    useEffect(() => {
        setTodayAS();
        if (netInfo?.isInternetReachable) {
            getAllLibBooksFromBackend();
            getUserDataFromBackend();
        }
    }, [])

    async function getAllLibBooksFromBackend() {
        await GetAllLibBooks();
        //wait for other code completion
        setTimeout(() => {
            setIsGotBackend(true);
        });
    }

    async function getUserDataFromBackend() {
        await GetUserData();
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