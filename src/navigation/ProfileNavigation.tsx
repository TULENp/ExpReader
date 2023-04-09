import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../screens/ProfileScreen";
import { DailyTaskScreen } from "../screens/DailyTaskScreen";
import { AchievementsScreen } from "../screens/AchievementsScreen";
import { ProfileStackParams } from "../types";

const Stack = createNativeStackNavigator<ProfileStackParams>();
export function ProfileNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="DailyTask" component={DailyTaskScreen} />
            <Stack.Screen name="Achievements" component={AchievementsScreen} />
        </Stack.Navigator>
    );
}