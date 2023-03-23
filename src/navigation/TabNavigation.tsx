import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LibraryNavigation } from './LibraryNavigation';
import { ShopNavigation } from './ShopNavigation';
import { ProfileNavigation } from './ProfileNavigation';

const Tab = createBottomTabNavigator();

export function TabNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='LibraryTab'>
                <Tab.Screen name="ShopTab" component={ShopNavigation} />
                <Tab.Screen name="LibraryTab" component={LibraryNavigation} />
                <Tab.Screen name="ProfileTab" component={ProfileNavigation} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}