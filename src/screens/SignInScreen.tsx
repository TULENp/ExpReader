import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { SignIn } from '../service/api';
import { AuthStackParams } from '../types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';

export function SignInScreen() {
    const { navigate } = useNavigation<NavigationProp<AuthStackParams>>();
    const { setIsAuthorized } = useContext(AppContext);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    async function handleSignIn() {
        const validationErrors: string[] = [];

        if (!login) {
            validationErrors.push('Введите логин');
        }

        if (!password) {
            validationErrors.push('Введите пароль');
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const res = await SignIn(login, password);
        if (res) {
            alert(res);
            return;
        }
        setIsAuthorized(true);
    }

    return (
        <View style={styles.container}>
            <Text>Логин</Text>
            <TextInput
                style={styles.input}
                placeholder="Логин"
                autoCapitalize="none"
                value={login}
                onChangeText={setLogin}
            />
            <Text>Пароль</Text>
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            <Text style={{ color: 'red' }}>{errors.join('; ')}</Text>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigate('Register')}>
                <Text style={styles.buttonText}>Регистрация</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

