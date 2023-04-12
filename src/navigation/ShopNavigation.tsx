import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ShopStackParams } from "../types";
import { ShopScreen } from "../screens/ShopScreen";
import { BookScreen } from "../screens/BookScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { FragmentReaderScreen } from "../screens/FragmetReaderScreen";

const Stack = createNativeStackNavigator<ShopStackParams>();

// const screenOptionStyle = {
//     headerStyle: {
//         backgroundColor: "#9AC4F8",
//     },
//     headerTintColor: "white",
//     headerBackTitle: "Back",
// };

export function ShopNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Shop" component={ShopScreen} />
            <Stack.Screen name="ShopBook" component={BookScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="FragmentReader" component={FragmentReaderScreen} />
        </Stack.Navigator>
    );
}