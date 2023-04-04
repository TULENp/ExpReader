import { View, Text, Button } from 'react-native'
import React from 'react'

export default function BookScreen({route, navigation }) {
   console.log("BOOOK SCREEN");
   const {id, title} = route.params;
    return (
        <View>
            <Text>{title}</Text>
            <Button title='to reader screen' onPress={() => navigation.navigate("Reader")} />
        </View>
    )
}