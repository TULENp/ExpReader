import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Pressable } from 'react-native';
import { SignIn } from '../service/api';
import { AuthStackParams } from '../types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { stylesSignInScreen } from './stylesScreen';
import { deepBlue, redRarity } from '../constants/colors';
import { srcIcnLogo } from '../constants/images';

export function SignInScreen() {
	const { navigate } = useNavigation<NavigationProp<AuthStackParams>>();
	const { setIsAuthorized, setIsAdmin } = useContext(AppContext);

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const [loginError, setLoginError] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');

	async function handleSignIn() {
		// const validationErrors: string[] = [];

		if (!login || !password) {
			// validationErrors.push('Введите логин');
			if (!login)
				setLoginError('Введите логин');
			if (!password)
				setPasswordError('Введите пароль')
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
		<View style={stylesSignInScreen.page}>
			<Pressable onPress={() => setIsAdmin((prev) => !prev)}>
				<Image style={stylesSignInScreen.logo} source={srcIcnLogo} />
			</Pressable>

			{/* Login input */}
			<View style={{ width: '100%', alignItems: 'center' }}>
				{/* <View style={{width:'100%', justifyContent:'flex-start',}}>
					<Text style={stylesSignInScreen.h1}>Логин</Text>
				</View> */}
				<TextInput
					style={stylesSignInScreen.input}
					placeholder="Логин"
					autoCapitalize="none"
					value={login}
					onChangeText={setLogin}
					selectionColor={redRarity}
				/>
				<View style={{ width: '100%', justifyContent: 'flex-start', }}>
					<Text style={{ color: redRarity }}>{loginError}</Text>
				</View>
			</View>

			{/* Password input */}
			<View style={{ width: '100%', alignItems: 'center', marginTop: 20, marginBottom: 50 }}>
				{/* <View style={{width:'100%', justifyContent:'flex-start',}}>
					<Text style={stylesSignInScreen.h1}>Пароль</Text>
				</View> */}
				<TextInput
					style={stylesSignInScreen.input}
					placeholder="Пароль"
					secureTextEntry
					autoCapitalize="none"
					value={password}
					onChangeText={setPassword}
					selectionColor={redRarity}
				/>
				<View style={{ width: '100%', justifyContent: 'flex-start', }}>
					<Text style={{ color: redRarity }}>{passwordError}</Text>
				</View>
			</View>

			{/* Action buttons */}
			<TouchableOpacity style={stylesSignInScreen.button} onPress={handleSignIn}>
				<Text style={stylesSignInScreen.buttonText}>Войти</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[stylesSignInScreen.button, { backgroundColor: 'white' }]} onPress={() => navigate('Register')}>
				<Text style={[stylesSignInScreen.buttonText, { color: deepBlue, }]}>Регистрация</Text>
			</TouchableOpacity>
		</View >
	);
};


