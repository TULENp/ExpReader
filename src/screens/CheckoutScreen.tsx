import { View, Text, TouchableOpacity, StatusBar, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons';
import { stylesCheckoutScreen } from './stylesScreen';
import { deepBlue } from '../constants/colors';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ShopStackParams, TBook } from '../types';
import { srcIcnError, srcIcnSberbank, srcImgHarryPotter3 } from '../constants/images';
import { Button } from 'react-native-elements';
import { BuyBook, GetAllLibBooks } from '../service/api';
import { imageURL } from '../constants';

type BookParams = {
    book: TBook;
}

export function CheckoutScreen() {
    const { goBack } = useNavigation<NavigationProp<ShopStackParams>>();
    const { book } = useRoute<RouteProp<Record<string, BookParams>, string>>().params;
    const { id, title, cover, authors, price } = book;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('200');

    async function buyBook() {
        setIsLoading(true);
        const res = await BuyBook(book.id);
        if (res == '200') {
            GetAllLibBooks();
            goBack();
        }
        else {
            setError(res);
        }
        setIsLoading(false);
    }

    return (
        <>
            {isLoading
                ?
                <View style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} color={deepBlue} />
                </View>
                :
                <>
                    {error === '200'
                        ?
                        <View style={stylesCheckoutScreen.checkout_page}>
                            <ScrollView>
                                <StatusBar backgroundColor={deepBlue} />
                                {/* Icon back and header text */}
                                <View style={stylesCheckoutScreen.container_header}>
                                    <TouchableOpacity onPress={() => goBack()}>
                                        <MaterialIcons name="keyboard-backspace"
                                            size={36}
                                            color="black"
                                        />
                                    </TouchableOpacity>
                                    <Text style={stylesCheckoutScreen.text_header}>Покупка</Text>
                                </View>
                                {/* Payment method */}
                                <View style={{ marginTop: 30 }}>
                                    <Text style={stylesCheckoutScreen.text_header_light}>Способ оплаты</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                                        <Image style={stylesCheckoutScreen.icn_sber} source={srcIcnSberbank} />
                                        <View style={{ marginLeft: 13 }}>
                                            <Text style={stylesCheckoutScreen.text_sber_online}>Сбербанк онлайн</Text>
                                            <Text style={stylesCheckoutScreen.text_without_commission}>Без комиссии</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* Section of book */}
                                <View style={{ marginTop: 20, marginBottom: 40 }}>
                                    <Text style={stylesCheckoutScreen.text_header_light}>Книга</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                        <Image style={stylesCheckoutScreen.cover} source={{ uri: imageURL + cover }} />
                                        <View style={{ flexShrink: 1, paddingLeft: 10 }}>
                                            <Text style={stylesCheckoutScreen.title}>{title}</Text>
                                            <Text style={stylesCheckoutScreen.author}>{authors}</Text>
                                            <Text style={stylesCheckoutScreen.price}>{price}₽</Text>
                                        </View>
                                    </View>
                                </View>
                                <Button title={'Оплатить'} onPress={buyBook}
                                    buttonStyle={stylesCheckoutScreen.button_buy}
                                    titleStyle={{ fontFamily: 'Montserrat700', fontSize: 18 }} />
                            </ScrollView>
                        </View>
                        :
                        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 45, height: 45 }} source={srcIcnError} />
                            <Text style={{ fontFamily: 'MontserratAlt400', fontSize: 20, textAlign: 'center' }}>{'Произошла ошибка: \n' + error}</Text>
                            <Text style={{ fontFamily: 'MontserratAlt400', fontSize: 20, textAlign: 'center' }}></Text>
                        </View>
                    }
                </>


            }
        </>
    )
}