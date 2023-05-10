import { Dimensions, StyleSheet } from 'react-native';

export const stylesUserCard = StyleSheet.create({
    container: {
        maxWidth: '100%',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        elevation: 13,
        marginLeft: 13,
        marginRight: 13,
        borderRadius: 8,
    },
    name: {
        fontFamily: 'MontserratAlt700',
        fontSize: 18,
    },
    countBook: {
        fontFamily: 'MontserratAlt400',
        fontSize: 12,
        marginBottom: 5,
    },
    value: {
        fontFamily: 'MontserratAlt500',
        fontSize: 14,
    },
    char: {
        fontFamily: 'MontserratAlt500',
        fontSize: 10,
    }
})