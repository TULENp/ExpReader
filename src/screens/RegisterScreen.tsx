import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Register, SignIn } from '../service/api';
import { AppContext } from '../context/AppContext';

export function RegisterScreen() {
    const { setIsAuthorized } = useContext(AppContext);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    async function handleRegister() {
        const validationErrors: string[] = [];

        if (!login) {
            validationErrors.push('Введите логин');
        }

        if (!password) {
            validationErrors.push('Введите пароль');
        }

        if (password !== repeatPassword) {
            validationErrors.push('Пароли не совпадают');
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const res = await Register(login, password, repeatPassword);
        if (res) {
            alert(res);
            return;
        }
        await SignIn(login, password);
        setIsAuthorized(true);
    };

    return (
        <View style={styles.container}>
            <Text>Логин</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={login}
                onChangeText={setLogin}
            />
            <Text>Пароль</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            <Text>Повторите пароль</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
            />
            <Text style={{ color: 'red' }}>{errors.join('; ')}</Text>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
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