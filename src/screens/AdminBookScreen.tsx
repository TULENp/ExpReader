import { View, Text, Image, TouchableOpacity, StatusBar, ImageBackground, FlatList, ActivityIndicator, Pressable, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AdminStackParams, TBook, TRarity } from '../types';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { stylesBookScreen } from './stylesScreen';
import { srcIcnCloudCry, srcImgBookHeader } from '../constants/images';
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from '@rneui/themed';
import { deepBlue, redRarity } from '../constants/colors';
import { Shadow } from 'react-native-shadow-2';
import { GetBook } from '../service/api';
import { imageURL } from '../constants';
import { calculateRarity } from '../service/motivation';

type BookParams = {
    id: string;
}

export function AdminBookScreen() {
    const { navigate, goBack, getParent } = useNavigation<NavigationProp<AdminStackParams>>();
    const { id } = useRoute<RouteProp<Record<string, BookParams>, string>>().params; // get book id from params
    const [book, setBook] = useState<TBook>();
    const [bookRarity, setBookRarity] = useState<TRarity>();
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        getBook();
        getParent()?.setOptions({ tabBarStyle: { display: 'flex', height: '8%' } }); //show tab bar
    }, [id]);

    async function getBook() {
        setIsLoading(true);
        const result = await GetBook(id);
        if (typeof result !== "number") {
            setBook(result);
            GetAndSetBookRarity(result.bookPages);
        }
        setIsLoading(false);
    }

    function GetAndSetBookRarity(bookPages: number) {
        const rarity = calculateRarity(bookPages);
        setBookRarity(rarity);
    }

    function removeBook() {
        Alert.alert(
            `Вы действительно хотите удалить книгу?`,
            '',
            [
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                {
                    text: 'Да',
                    //TODO remove book
                    onPress: () => alert('Удалено'),
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <>
            {isLoading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <ActivityIndicator size={'large'} color={deepBlue} />
                </View>
                :
                <View style={stylesBookScreen.book_screen}>
                    {!book
                        ?
                        <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 80, height: 80 }} source={srcIcnCloudCry} />
                            <Text style={{ fontFamily: 'MontserratAlt400', fontSize: 18 }}>Книга не найдена</Text>
                        </View>
                        :
                        <ScrollView>
                            <StatusBar backgroundColor={deepBlue} />
                            {/* bookScreen header */}
                            <View style={stylesBookScreen.book_header}>
                                <Image style={stylesBookScreen.img_header} source={srcImgBookHeader} />
                                <TouchableOpacity style={stylesBookScreen.icn_back} onPress={() => goBack()}>
                                    <MaterialIcons name="keyboard-backspace"
                                        size={36}
                                        color="white"
                                    />
                                </TouchableOpacity>

                                {/* Book card */}
                                <View style={stylesBookScreen.container__cover_book_info}>
                                    <View style={stylesBookScreen.wrapper_img_cover}>
                                        <Shadow distance={1} startColor={bookRarity?.color} offset={[9, 9]}>
                                            <ImageBackground style={stylesBookScreen.img_cover} source={{ uri: imageURL + book.cover }}>
                                                {/* <Image style={stylesBookScreen.icn_rarity} source={srcIcnBronze} /> */}
                                            </ImageBackground>
                                        </Shadow>
                                    </View>
                                    <View style={stylesBookScreen.book_info}>
                                        <Text style={stylesBookScreen.title}>{book.title}</Text>
                                        <Text style={stylesBookScreen.author}>{book.authors}</Text>

                                        {/* Actions */}
                                        <View style={stylesBookScreen.container_all_buttons}>
                                            <Button title={'Фрагмент'}
                                                onPress={() => navigate('Fragment', { fragment: book.fragment })}
                                                titleStyle={stylesBookScreen.button_title}
                                                buttonStyle={stylesBookScreen.button_fragment}
                                                containerStyle={stylesBookScreen.button_fragment_grow}
                                            />
                                            <Button title={'Удалить'}
                                                onPress={removeBook}
                                                titleStyle={stylesBookScreen.button_title}
                                                buttonStyle={[stylesBookScreen.button_fragment, {backgroundColor:redRarity, marginTop:10}]}
                                                containerStyle={stylesBookScreen.button_fragment_grow}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Section genres of book */}
                            <View style={{ paddingLeft: 13, marginTop: 20 }}>
                                <Text style={stylesBookScreen.text_header}>Жанры</Text>
                                <FlatList horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={book.genres}
                                    renderItem={({ item }) =>
                                        <View style={stylesBookScreen.container_genres}>
                                            <Text style={stylesBookScreen.text_genres}>{item}</Text>
                                        </View>}
                                />
                            </View>
                            <Text style={stylesBookScreen.text_amount_pages}>Кол-во страниц:
                                <Text style={{ fontFamily: 'MontserratAlt500' }}> {book.bookPages}</Text>
                            </Text>

                            {/* Rarity of book */}
                            <Text style={stylesBookScreen.text_amount_pages}>Имя файла:
                                <Text style={{ fontFamily: 'MontserratAlt500' }}> {book.bookPages}</Text>
                            </Text>

                            <Modal visible={isVisibleModal}
                                transparent
                                onRequestClose={() => setIsVisibleModal(false)}
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >

                                {/* Gray View */}
                                <Pressable onPress={() => setIsVisibleModal(false)} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#00000070', }}>

                                    {/* Rarity modal View */}
                                    <View style={{ backgroundColor: 'white', width: 250, height: 280, borderRadius: 8 }}>
                                        {/* <Shadow  offset={[0,8]} distance={0} startColor={bookRarity?.color}> */}
                                        <View style={{ width: '100%', height: '40%', paddingBottom: 15, backgroundColor: bookRarity?.color, borderRadius: 8 }}>
                                            <Image blurRadius={3} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 8 }} source={{ uri: imageURL + book.cover }} />
                                        </View>
                                        {/* </Shadow> */}
                                        <Text style={{ width: '100%', textAlign: 'center', fontFamily: 'MontserratAlt700', fontSize: 18, color: bookRarity?.color, marginTop: 10 }}>{bookRarity?.rarity}</Text>
                                        <Text style={{ width: '100%', textAlign: 'center', fontFamily: 'MontserratAlt400', fontSize: 16, marginTop: 5 }}>{book.bookPages} стр.</Text>
                                        <Text style={{ width: '100%', textAlign: 'center', fontFamily: 'MontserratAlt400', fontSize: 14, color: '#9d9d9d', marginTop: 10 }}>Редкость зависит от количества страниц книги. Чем больше страниц - тем выше редкость. </Text>
                                    </View>
                                </Pressable>
                            </Modal>

                            {/* Description of book */}
                            <View style={{ marginLeft: 13, marginTop: 20, marginRight: 13 }}>
                                <Text style={stylesBookScreen.text_header}>Синопсис</Text>
                                <Text style={stylesBookScreen.text_description}>
                                    {book.description}
                                </Text>
                            </View>
                        </ScrollView>
                    }
                </View>
            }
        </>
    )
}