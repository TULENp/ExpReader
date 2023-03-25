import { View, Text, Button } from 'react-native'
import React from 'react'

export default function BookScreen({ navigation }) {
   console.log("BOOOK SCREEN");
   
    return (
        <View>
            <Text>BookScreen</Text>
            <Button title='to reader screen' onPress={() => navigation.navigate("Reader")} />
        </View>
    )
}