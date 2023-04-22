import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { Register, SignIn } from '../service/api';
import { AppContext } from '../context/AppContext';
import { stylesSignInScreen } from './stylesScreen';
import { srcIcnLogo } from '../constants/images';
import { redRarity } from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParams } from '../types';

export function RegisterScreen() {
    const { setIsAuthorized } = useContext(AppContext);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const { goBack } = useNavigation<NavigationProp<AuthStackParams>>();

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

        // login = nickname
        const res = await Register(login, password, login);
        if (res !== '200') {
            alert(res);
            return;
        }
        await SignIn(login, password);
        setIsAuthorized(true);
    };

    return (
        <View style={stylesSignInScreen.page}>
            <TouchableOpacity style={stylesSignInScreen.header} onPress={() => goBack()} >
                <MaterialIcons name="keyboard-backspace" size={36} color="black" />
            </TouchableOpacity>
            <Image style={stylesSignInScreen.logo} source={srcIcnLogo} />
            
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '100%', justifyContent: 'flex-start', }}>
                    <Text style={stylesSignInScreen.h1}>Логин</Text>
                </View>
                <TextInput
                    style={stylesSignInScreen.input}
                    autoCapitalize="none"
                    value={login}
                    onChangeText={setLogin}
                    selectionColor={redRarity}
                />
            </View>

            <View style={{ width: '100%', alignItems: 'center', marginTop: 20, }}>
                <View style={{ width: '100%', justifyContent: 'flex-start', }}>
                    <Text style={stylesSignInScreen.h1}>Пароль</Text>
                </View>
                <TextInput
                    style={stylesSignInScreen.input}
                    secureTextEntry
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                    selectionColor={redRarity}
                />
            </View>

            <View style={{ width: '100%', alignItems: 'center', marginTop: 20, marginBottom: 30 }}>
                <View style={{ width: '100%', justifyContent: 'flex-start', }}>
                    <Text style={stylesSignInScreen.h1}>Повторите пароль</Text>
                </View>
                <TextInput
                    style={stylesSignInScreen.input}
                    secureTextEntry
                    autoCapitalize="none"
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                    selectionColor={redRarity}
                />
                <Text style={{ color: 'red' }}>{errors.join('; ')}</Text>
            </View>
            <TouchableOpacity style={stylesSignInScreen.button} onPress={handleRegister}>
                <Text style={stylesSignInScreen.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
    );
};