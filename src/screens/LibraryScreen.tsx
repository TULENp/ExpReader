import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deepBlue, pink, redRarity } from '../constants/colors';

export default function LibraryScreen() {
    //TODO fix TS navigation error
    const navigation = useNavigation();


    return (
        <View>
            <Text style={styles.mainText}>LibraryScreen</Text>
            <Button
                title='to book screen'
                onPress={() => navigation.navigate('Book')}
            />
            <Button
                title='to reader screen'
                onPress={() => navigation.navigate('Reader')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainText:{
        color:pink
    }
})

