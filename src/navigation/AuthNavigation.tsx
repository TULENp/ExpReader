import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParams } from "../types";
import { SignInScreen } from "../screens/SignInScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator<AuthStackParams>();

export function AuthNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}