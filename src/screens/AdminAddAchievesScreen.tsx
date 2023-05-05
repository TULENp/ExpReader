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
import { stylesAchievementsScreen } from './stylesScreen';

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
        <View style={{ flex: 1, justifyContent: "space-around" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <Text>Заголовок</Text>
                    <TextInput
                        style={styles.input}
                        value={achieve.title}
                        onChangeText={(text) => setAchieve({ ...achieve, title: text })}
                    />
                </View>
                {/* TODO add type picker */}
                <View>
                    <Text>Условие выполнения</Text>
                    <TextInput
                        style={styles.input}
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
                <View>
                    <Text>Описание</Text>
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        value={achieve.description}
                        multiline
                        onChangeText={(text) => setAchieve({ ...achieve, description: text })}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                    <Text style={styles.buttonText}>Выбрать изображение</Text>
                </TouchableOpacity>
            </ScrollView>
            
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
                    <Text style={stylesAchievementsScreen.author}>{achieve.description || 'Описание'}</Text>
                </View>
            </View>
            <Button title="Добавить достижение" onPress={handleAddAchieve} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 20,
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


