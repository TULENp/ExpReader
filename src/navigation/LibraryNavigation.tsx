import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReaderScreen from "../screens/ReaderScreen";
import LibraryScreen from "../screens/LibraryScreen";
import { LibStackParams } from "../types";

const Stack = createNativeStackNavigator<LibStackParams>();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

export function LibraryNavigation() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Library" component={LibraryScreen} />
            <Stack.Screen name="Reader" component={ReaderScreen} />
        </Stack.Navigator>
    );
}