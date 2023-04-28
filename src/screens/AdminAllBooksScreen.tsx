import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AdminStackParams, TShopBook } from '../types';
import { GetAllShopBooks } from '../service/api';
import { BookShopCard } from '../components/BookShopCard';
import { deepBlue } from '../constants/colors';
import { srcIcnCloudCry, srcIcnError } from '../constants/images';
import { stylesShopScreen } from './stylesScreen';

export function AdminAllBooksScreen() {
    const { navigate, goBack } = useNavigation<NavigationProp<AdminStackParams>>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<number>(-1);

    const [books, setBooks] = useState<TShopBook[]>([]);

    useEffect(() => {
        getBooks();
    }, [])

    async function getBooks() {
        const filtersInit = {
            sortID: '0',
            rarity: null,
            searchValue: '',
            genres: [],
        }
        setIsLoading(true);
        const books = await GetAllShopBooks(filtersInit);
        if (typeof books == 'number') {
            setError(books);
        }
        else {
            setBooks(books);
        }
        setIsLoading(false);
    }

    const booksList: JSX.Element[] = books.map((book) => {
        return (
            <TouchableOpacity key={book.id} style={{ maxWidth: 116, width: '100%' }} onPress={() => navigate('Book', { id: book.id })}>
                <BookShopCard book={book} />
            </TouchableOpacity>
        )
    })

    return (
        <View>
            {isLoading
                ?
                <View style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} color={deepBlue} />
                </View>
                :
                <>
                    {error !== -1
                        ?
                        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 45, height: 45 }} source={srcIcnError} />
                            <Text style={{ fontFamily: 'MontserratAlt400', fontSize: 20, textAlign: 'center' }}>{'Произошла ошибка: \n' + error}</Text>
                        </View>
                        :
                        <>
                            <Button title={'Добавить книгу'} onPress={() => navigate('AddBook')} />
                            <ScrollView>
                                <View style={stylesShopScreen.container_books_shop_card}>
                                    {books.length === 0
                                        ?
                                        <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image style={{ width: 80, height: 80 }} source={srcIcnCloudCry} />
                                            <Text style={{ fontFamily: 'MontserratAlt400', fontSize: 18 }}>Книги не найдены</Text>
                                        </View>
                                        :
                                        booksList
                                    }
                                </View>
                            </ScrollView>
                        </>
                    }
                </>
            }
        </View>
    )
}