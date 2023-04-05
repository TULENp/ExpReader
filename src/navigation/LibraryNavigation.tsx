import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LibStackParams } from "../types";
import ReaderScreen from "../screens/ReaderScreen";
import LibraryScreen from "../screens/LibraryScreen";

const Stack = createNativeStackNavigator<LibStackParams>();

// const screenOptionStyle = {
//     headerStyle: {
//         backgroundColor: "#9AC4F8",
        
//     },
//     headerTintColor: "white",
//     headerBackTitle: "Back",
// };

export function LibraryNavigation() {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Library" component={LibraryScreen} />
            <Stack.Screen name="Reader" component={ReaderScreen} />
        </Stack.Navigator>
    );
}