import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { stylesAchievementsScreen, stylesAdminScreen } from './stylesScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons'; 
import { deepBlue, greenRarity } from '../constants/colors';

interface achieve {
    title: string;
    type: 'books' | 'pages';
    condition: number;
    description: string,
}

export function AdminAddAchieveScreen() {
    const [achieve, setAchieve] = useState<achieve>({
        title: '',
        type: 'pages',
        condition: 0,
        description: '',
    });

    const [image, setImage] = useState<{ uri: string } | null>(null);

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            allowsMultipleSelection: false
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const handleAddAchieve = () => {
        // TODO Implement logic for adding achieve to database or server
        console.log(achieve);
        console.log(image);
    };

    return (
        <View style={{ flex: 1, }}>
            <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                flexDirection: 'row',
                gap: 8,
                marginBottom: 10,
                marginTop: 10,
                height: 90
                }}>
                    <View style={stylesAchievementsScreen.wrapper_pin}>
                        {image && <Image style={{ width: 80, height: 80 }} source={image} />}
                    </View>
                    <View style={stylesAchievementsScreen.wrapper_pin_info}>
                        <Text style={stylesAchievementsScreen.title}>{achieve.title || 'Заголовок'}</Text>
                        <Text style={stylesAchievementsScreen.text}>{achieve.description || 'Описание'}</Text>
                    </View>
                </View>
                <View style={{marginTop:10,paddingLeft:13,paddingRight:13}}>
                    <Text style={stylesAdminScreen.text_h2}>Заголовок</Text>
                    <TextInput
                        style={[stylesAdminScreen.input,{marginTop:10}]}
                        value={achieve.title}
                        onChangeText={(text) => setAchieve({ ...achieve, title: text })}
                    />
                </View>
                {/* TODO add type picker */}
                <View style={{marginTop:10,paddingLeft:13,paddingRight:13}}>
                    <Text style={stylesAdminScreen.text_h2}>Условие выполнения</Text>
                    <TextInput
                        style={[stylesAdminScreen.input,{marginTop:10}]}
                        keyboardType="numeric"
                        value={achieve.condition.toString()}
                        onChangeText={(value) => {
                            const intValue = parseInt(value || '0', 10);
                            setAchieve({
                                ...achieve,
                                condition: Number.isInteger(intValue) ? intValue : 0,
                            });
                        }}
                    />
                </View>
                <View style={{marginTop:10,paddingLeft:13,paddingRight:13}}>
                    <Text style={stylesAdminScreen.text_h2}>Описание</Text>
                    <TextInput
                        style={[stylesAdminScreen.input, { height: 80, marginTop:10 }]}
                        value={achieve.description}
                        multiline
                        onChangeText={(text) => setAchieve({ ...achieve, description: text })}
                    />
                </View>
                
                <View style={{marginLeft:13,marginRight:13}}>
                    <TouchableOpacity style={[stylesAdminScreen.standard_btn,{borderStyle:'dashed', borderWidth:1, borderColor:deepBlue}]} onPress={handlePickImage}>
                        <AntDesign name="pluscircleo" size={22} color={deepBlue} />
                        <Text style={[stylesAdminScreen.standard_btn_text,{color:deepBlue, marginLeft:10}]}>Добавить изображение</Text>
                    </TouchableOpacity>
                    {/* <Button title="Добавить достижение" onPress={handleAddAchieve} /> */}
                    <TouchableOpacity style={[stylesAdminScreen.standard_btn,{backgroundColor:greenRarity,}]} onPress={handleAddAchieve}>
                        <Text style={stylesAdminScreen.standard_btn_text}>Добавить достижение</Text>
                    </TouchableOpacity>
                </View>
                
                </KeyboardAwareScrollView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        // padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        width: '100%',
        height: 40,
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});


