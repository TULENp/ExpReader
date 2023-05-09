import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView, ImageBackground, KeyboardAvoidingView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigation, NavigationProp, useScrollToTop } from '@react-navigation/native';
import { AdminStackParams, TShopBook } from '../types';
import { GetAllShopBooks } from '../service/api';
import { BookShopCard } from '../components/BookShopCard';
import { deepBlue, greenRarity, lightBlue } from '../constants/colors';
import { srcIcnCloudCry, srcIcnError, srcIcnFilter, srcIcnNoInternet, srcImgShopHeader } from '../constants/images';
import { stylesAdminScreen, stylesShopScreen } from './stylesScreen';
import Drawer from 'react-native-drawer';
import { Button, Input } from 'react-native-elements';
import { Filters } from '../components/Filters';
import { AppContext } from '../context/AppContext';
import { TFilters } from './ShopScreen';
import { AntDesign } from '@expo/vector-icons'; 

const filtersInit: TFilters = {
    sortID: '0',
    rarity: null,
    searchValue: '',
    genres: [],
}
export function AdminAllBooksScreen() {
    const scrollToTop = useRef(null);
    useScrollToTop(scrollToTop);
    const { navigate } = useNavigation<NavigationProp<AdminStackParams>>();
    const [books, setBooks] = useState<TShopBook[]>([]);
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const [filters, setFilters] = useState<TFilters>(filtersInit);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { netInfo } = useContext(AppContext)
    const [error, setError] = useState<number>(-1);

    useEffect(() => {
        getBooks();
    }, [])

    async function getBooks(isReset: boolean = false) {
        setIsLoading(true);
        const books = await GetAllShopBooks(isReset ? filtersInit : filters);
        if (isReset) {
            setFilters(filtersInit);
        }
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

    const drawerStyles = {
        drawer: { backgroundColor: 'white', shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 3, },
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
                    {!netInfo?.isInternetReachable
                        ?
                        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 45, height: 45 }} source={srcIcnNoInternet} />
                            <Text style={{ fontFamily: 'MontserratAlt400', fontSize: 20, textAlign: 'center' }}>Нет доступа к интернету</Text>
                        </View>
                        : (error !== -1)
                            ?
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ width: 45, height: 45 }} source={srcIcnError} />
                                <Text style={{ fontFamily: 'MontserratAlt400', fontSize: 20, textAlign: 'center' }}>{'Произошла ошибка: \n' + error}</Text>
                            </View>
                            :
                            <>
                                <StatusBar backgroundColor={deepBlue} />
                                <Drawer type='overlay'
                                    content={<Filters filters={filters} setFilters={setFilters} filterBooks={getBooks} />}
                                    open={isOpenDrawer}
                                    onClose={() => setIsOpenDrawer(false)}
                                    tapToClose={true}
                                    openDrawerOffset={0.2} // 20% gap on the right side of drawer
                                    panCloseMask={0.2}
                                    // closedDrawerOffset={-1}
                                    styles={drawerStyles}
                                    side='right'
                                    tweenHandler={(ratio) => ({
                                        main: { opacity: (2 - ratio) / 2 }
                                    })}
                                >
                                    <KeyboardAvoidingView behavior='height' style={stylesShopScreen.shop_page}>
                                        <ScrollView ref={scrollToTop}>
                                            <ImageBackground style={stylesShopScreen.img_header} source={srcImgShopHeader}>
                                                <View style={stylesShopScreen.container_search_input}>
                                                    <Input value={filters.searchValue}
                                                        onChangeText={(text) => {
                                                            setFilters((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    searchValue: text
                                                                }
                                                            });
                                                        }}
                                                        onSubmitEditing={() => getBooks()}
                                                        placeholder={'Найти книги'}
                                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                                        leftIcon={{ type: 'octicons', name: 'search' }}
                                                        style={[stylesShopScreen.search_input, { fontFamily: 'MontserratAlt400' }]} />
                                                </View>
                                                <TouchableOpacity onPress={() => setIsOpenDrawer(prev => !prev)}>
                                                    <Image style={{ width: 36, height: 36, }} source={srcIcnFilter} />
                                                </TouchableOpacity>
                                            </ImageBackground>

                                            {/* Add book Button */}
                                            <View style={{width:'100%', justifyContent:'center',paddingTop:15, alignItems:'center'}}>
                                                <TouchableOpacity style={[stylesAdminScreen.buttons,{backgroundColor:greenRarity, flexDirection:'row'}]} onPress={() => navigate('AddBook')}>
                                                    <AntDesign name="pluscircleo" size={22} color="white" />
                                                    <Text style={[stylesAdminScreen.buttons_text, {marginLeft:10}]}>Добавить книгу</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {/* Shop books list */}
                                            <Text style={stylesShopScreen.text_shop}>Каталог</Text>
                                            <View style={stylesShopScreen.container_books_shop_card}>
                                                {books.length === 0
                                                    ?
                                                    <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image style={{ width: 80, height: 80 }} source={srcIcnCloudCry} />
                                                        <Text style={{ fontFamily: 'MontserratAlt400', fontSize: 18 }}>Книги не найдены</Text>
                                                        <TouchableOpacity onPress={() => getBooks(true)} style={{ width: '70%', height: 40, marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: lightBlue, borderRadius: 8 }}>
                                                            <Text style={{ fontFamily: 'MontserratAlt700', fontSize: 18, color: 'white' }}>Сбросить фильтры</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    booksList
                                                }
                                            </View>
                                        </ScrollView>
                                    </KeyboardAvoidingView>
                                </Drawer>
                            </>
                    }
                </>
            }
        </>
    )
}
