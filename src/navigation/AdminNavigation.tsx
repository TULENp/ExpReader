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

const Stack = createNativeStackNavigator<AdminStackParams>();

export function AdminNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" options={{ title: 'Главная' }} component={AdminMainScreen} />
                <Stack.Screen name="AllBooks" options={{ title: 'Книги' }} component={AdminAllBooksScreen} />
                {/* TODO fix Book header */}
                <Stack.Screen name="Book" options={{ title: 'Данные книги' }} component={AdminBookScreen} />
                <Stack.Screen name="AddBook" options={{ title: 'Добавление книги' }} component={AdminAddBookScreen} />
                <Stack.Screen name="Genres" options={{ title: 'Жанры' }} component={AdminGenresScreen} />
                <Stack.Screen name="Authors" options={{ title: 'Авторы' }} component={AdminAuthorsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}