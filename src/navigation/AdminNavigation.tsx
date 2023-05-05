import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AdminAllBooksScreen } from "../screens/AdminAllBooksScreen";
import { AdminAddBookScreen } from "../screens/AdminAddBookScreen";
import { AdminAuthorsScreen } from "../screens/AdminAuthorsScreen";
import { AdminBookScreen } from "../screens/AdminBookScreen";
import { AdminGenresScreen } from "../screens/AdminGenresScreen";
import { AdminMainScreen } from "../screens/AdminMainScreen";
import { AdminStackParams } from "../types";
import { FragmentReaderScreen } from "../screens/FragmentReaderScreen";
import { AdminAddAchieveScreen } from "../screens/AdminAddAchievesScreen";
import { AdminDailyTaskScreen } from "../screens/AdminDailyTaskScreen";
import { AdminRarityScreen } from "../screens/AdminRarityScreen";
import { AdminAchievesScreen } from "../screens/AdminAchievesScreen";

const Stack = createNativeStackNavigator<AdminStackParams>();

export function AdminNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" options={{ title: 'Главная' }} component={AdminMainScreen} />
                <Stack.Screen name="AllBooks" options={{ headerShown: false }} component={AdminAllBooksScreen} />
                <Stack.Screen name="Book" options={{ headerShown: false }} component={AdminBookScreen} />
                <Stack.Screen name="AddBook" options={{ title: 'Добавление книги' }} component={AdminAddBookScreen} />
                <Stack.Screen name="Genres" options={{ title: 'Жанры' }} component={AdminGenresScreen} />
                <Stack.Screen name="Authors" options={{ title: 'Авторы' }} component={AdminAuthorsScreen} />
                <Stack.Screen name="Fragment" options={{ headerShown: false }} component={FragmentReaderScreen} />
                <Stack.Screen name="Achieves" options={{ title: 'Достижения' }} component={AdminAchievesScreen} />
                <Stack.Screen name="DailyTask" options={{ title: 'Ежедневная цель' }} component={AdminDailyTaskScreen} />
                <Stack.Screen name="Rarity" options={{ title: 'Редкость' }} component={AdminRarityScreen} />
                <Stack.Screen name="AddAchieve" options={{ title: 'Добавление достижения' }} component={AdminAddAchieveScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}