
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ScrollView, Button, AppState, Dimensions, Modal, Animated, Pressable, TouchableOpacity, StatusBar } from 'react-native';
import { pageChars } from '../../constants';
import {
    getBookNamesAS,
    getFontSizeSettingsAS,
    getPaddingSizeSettingsAS,
    getThemeSettingsAS,
    getUserBookStatsAS,
    getUserDataAS,
    incTodayPagesAS,
    incUserReadPagesAS,
    setBookIsReadAS,
    setFileBookPagesAS,
    setFontSizeSettingsAS,
    setPaddingSizeSettingsAS,
    setThemeSettingsAS,
    updateBookCurrentPageAS,
    updateBookReadDateAS,
    updateBookReadPagesAS,
} from '../../service/asyncStorage';
import { LibStackParams, TLibBook } from '../../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { checkBookmarkReward } from '../../service/motivation';
import { UpdateUserBookStats, UpdateUserStats } from '../../service/api';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { stylesReader } from './style';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { purple, redRarity, themeYellow, yellowRarity } from '../../constants/colors';
import { srcIcnFieldDec, srcIcnFieldInc } from '../../constants/images';
// import Animated from 'react-native-reanimated';

interface ReaderProps {
    bookText: string;
    book: TLibBook;
}

export function Reader({ bookText, book }: ReaderProps) {
    const id = book.id.toString();
    const scrollViewRef = useRef<ScrollView>(null); // ref to ScrollView with pageText
    const navigation = useNavigation();
    const bookPages = book.bookPages || Math.ceil(bookText.length / pageChars); // number of pages in book
    const silver = Math.floor(2 * bookPages / 3); // 2/3 of all pages of the book
    const [refSwipePage, setRefSwipePage] = useState<any[]>([]) // Ref to interact with the swipeable screen
    const { goBack } = useNavigation<NavigationProp<LibStackParams>>();

    const [sessionPages, setSessionPages] = useState<number>(0); // number of pages read today
    const [pageText, setPageText] = useState(''); // text on one page
    const [currentPage, setCurrentPage] = useState(book.currentPage); // starts from 1, not from 0
    const [readPages, setReadPages] = useState(book.readPages); // number of book pages read
    const [readTimer, setReadTimer] = useState<NodeJS.Timeout | null>(null) // timer after which the page is considered read

    const width = Dimensions.get('window').width;

    //States for reader settings
    const [readerTheme, setReaderTheme] = useState<string>('white');
    const [fontSize, setFontSize] = useState<number>(25);
    const [paddingSize, setPaddingSize] = useState<number>(10);

    useEffect(() => {
        if (bookPages !== book.bookPages) {
            setFileBookPagesAS(id, bookPages);
        }
        updateBookReadDateAS(id);
        getThemeSettings();
        getFontSizeSettings();
        getPaddingSizeSettings();
    }, []);

    useEffect(() => {
        scrollToTop();
        readCurrentPage();
        updateBookCurrentPageAS(id, currentPage);
    }, [currentPage]);

    useEffect(() => {
        // Called just before the component is destroyed
        const unsubscribe = navigation.addListener('beforeRemove', () => updateData());
        // Called when the application goes into the background
        const subscription = AppState.addEventListener('change', appState => {
            if (appState == 'background') {
                updateData();
            }
        });

        return () => {
            unsubscribe();
            subscription.remove();
        };
    }, [sessionPages])

    useEffect(() => {
        if (sessionPages !== 0) { // check counter to prevent reading points farm
            checkBookmarkReward(readPages, bookPages);
        }
    }, [readPages])

    async function updateData() {
        // Update data in async storage
        if (sessionPages !== 0) {
            incUserReadPagesAS(sessionPages);
            incTodayPagesAS(sessionPages);
            // drop counter to prevent reading points farm
            setSessionPages(0);
        }
        await updateBookReadPagesAS(id, readPages);

        updateStatsBackend();
    }

    async function updateStatsBackend() {
        // Update book stats
        const bookNames = await getBookNamesAS();
        const booksStats = await getUserBookStatsAS(bookNames);
        UpdateUserBookStats(booksStats);

        // Update user stats
        const userData = await getUserDataAS();
        if (userData) {
            UpdateUserStats(userData);
        }
    }




    function readCurrentPage() {
        if (bookText) {
            const pageFirstCharNum: number = (currentPage - 1) * pageChars; // number of the first char of current page
            const nextPageFirstCharNum: number = pageFirstCharNum + pageChars; // number of the last char of current page
            let text: string = '';

            let index: number = pageFirstCharNum;
            // is needed to skip a piece of the last word, and read the next word from the beginning
            if (index !== 0) { // only if its not the first word of the book
                while (bookText[index] !== ' ' && index < bookText.length) {
                    index++;
                }
                index++; // to avoid space
            }
            // read the whole page
            while (index < nextPageFirstCharNum && index < bookText.length) {
                text += bookText[index];
                index++
            }
            // is needed to read the last word completely
            while (bookText[index] !== ' ' && index < bookText.length) {
                text += bookText[index];
                index++;
            }
            setPageText(text + '\n');
        }
        else {
            setPageText('Книга не найдена');
        }
    }

    function toNextPage() {
        if (currentPage < bookPages) {
            setCurrentPage((prev) => prev + 1);
            // reset the timer if it exists
            if (readTimer) {
                clearTimeout(readTimer);
                setReadTimer(null);
            }
            // 5 second timer 
            const timer = setTimeout(() => {
                if (currentPage > readPages) {
                    setReadPages(prev => prev + 1);
                }
                setSessionPages(prev => prev + 1);

                // Read last page
                if (currentPage + 1 === bookPages && readPages >= silver && readPages < bookPages) {
                    setBookIsReadAS(id, bookPages);
                    //! DO NOT swap lines
                    setReadPages(bookPages);
                    setSessionPages(prev => prev + 1);
                    //! 
                }
            }, 0); // 5000 = 5000 ms = 5 second timer
            setReadTimer(timer);
        }
    }

    function toPrevPage() {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }

    function scrollToTop() {
        scrollViewRef.current?.scrollTo({ y: 0 });
    }

    function closeSwipe() {
        refSwipePage[0]?.close();
    }


    // Reader settings
    //switch theme:0=white,1=yellow,2=black
    function switchTheme(theme: number) {
        switch (theme) {
            case 0:
                setReaderTheme('white');
                setThemeSettingsAS('white');
                break;
            case 1:
                setReaderTheme(themeYellow);
                setThemeSettingsAS(themeYellow);
                break;
            case 2:
                setReaderTheme('black');
                setThemeSettingsAS('black');
                break;
        }
    }

    async function getThemeSettings() {
        let res = await getThemeSettingsAS()
        if (res !== null) {
            setReaderTheme(res);
        } else {
            setReaderTheme('white');
        }
    }

    //Increase fontSize text
    function increaseFontSize() {
        if (fontSize <= 48) {
            setFontSize(prev => prev + 1);
            setFontSizeSettingsAS(fontSize);
        }

    }

    //Decrease fontSize text
    function decreaseFontSize() {
        if (fontSize >= 20) {
            setFontSize(prev => prev - 1);
            setFontSizeSettingsAS(fontSize);
        }
    }

    async function getFontSizeSettings() {
        let res = await getFontSizeSettingsAS()
        if (res !== null) {
            setFontSize(res);
        }
    }

    //Increase paddingSize text
    function increasePaddingSize() {
        if (paddingSize >= 0) {
            setPaddingSize(prev => prev - 3);
            setPaddingSizeSettingsAS(paddingSize);
        }
    }

    //Decrease paddingSize text
    function decreasePaddingSize() {
        if (paddingSize <= 60) {
            setPaddingSize(prev => prev + 3);
            setPaddingSizeSettingsAS(paddingSize);
        }
    }

    async function getPaddingSizeSettings() {
        let res = await getPaddingSizeSettingsAS()
        if (res !== null) {
            setPaddingSize(res);
        }
    }


    const { height } = Dimensions.get('window')

    // Animation value
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [visibleSettings, setVisibleSettings] = useState<boolean>(false);
    const AnimUpperModalValue = useRef(new Animated.Value(-65)).current
    const AnimLowerModalValue = useRef(new Animated.Value(height + 270)).current

    // Show or Hide general modal without settings
    const ShowHideModal = () => {
        if (visibleModal) {
            Animated.timing(AnimUpperModalValue, { toValue: -65, useNativeDriver: true, duration: 200 }).start()
            Animated.timing(AnimLowerModalValue, { toValue: height + 330, useNativeDriver: true, duration: 200 }).start()
            setTimeout(() => {
                setVisibleModal(false);
                setVisibleSettings(false);
            }, 100)
        } else {
            setVisibleModal(true);
            Animated.timing(AnimUpperModalValue, { toValue: 0, useNativeDriver: true, duration: 200 }).start()
            Animated.timing(AnimLowerModalValue, { toValue: height + 230, useNativeDriver: true, duration: 200 }).start()
        }
    }

    // Show or Hide modal with settings
    const ShowHideSettings = () => {
        if (visibleModal) {
            if (visibleSettings) {
                setVisibleSettings(false);
                Animated.timing(AnimLowerModalValue, { toValue: height + 230, useNativeDriver: true, duration: 200 }).start()
            } else {
                setVisibleSettings(true);
                Animated.timing(AnimLowerModalValue, { toValue: height, useNativeDriver: true, duration: 200 }).start()
            }
        }
    }

    const truncateTitle = (str: string) => {
        if (str.length >= 25) {
            return str.substring(0, 25) + '...';
        }
        return str;
    }

    // TODO remove scroll animation 
    return (
        <>
            {/* TODO remove scroll animation */}
            <ScrollView scrollEnabled={true} style={{ backgroundColor: readerTheme }} ref={scrollViewRef}>
                <GestureHandlerRootView style={{ flex: 1, position: 'relative' }}>
                    <StatusBar backgroundColor={visibleModal ? purple : readerTheme} barStyle={readerTheme === 'black' ? 'light-content' : 'dark-content'} />
                    <Swipeable
                        ref={ref => refSwipePage[0] = ref}
                        // render empty view for swipe animation (it`s crutch)
                        renderRightActions={() => <View style={{ width: 10 }}></View>}
                        renderLeftActions={() => <View style={{ width: 10 }}></View>}

                        onSwipeableLeftOpen={() => {
                            toPrevPage();
                            closeSwipe();
                        }}
                        onSwipeableRightOpen={() => {
                            toNextPage();
                            closeSwipe();
                        }}>
                        <Pressable style={{}}>
                            <Text style={{ alignSelf: 'center', textAlign: 'justify', fontSize: fontSize, paddingTop: 10, paddingLeft: paddingSize, paddingRight: paddingSize, color: readerTheme === 'black' ? 'white' : 'black' }}>{pageText}</Text>
                        </Pressable>
                    </Swipeable>

                    {/* Left btn prev page */}
                    <Pressable pointerEvents={'box-only'} onPress={() => toPrevPage()} style={[stylesReader.btn_prev_next]} />

                    {/* Middle btn open modal */}
                    <Pressable pointerEvents={'box-only'} onPress={() => ShowHideModal()} style={stylesReader.container_middle} />

                    {/* Right btn prev page */}
                    <Pressable pointerEvents={'box-only'} onPress={() => toNextPage()} style={[stylesReader.btn_prev_next, { right: 0 }]} />

                    {/* Modal setting */}
                    <Modal
                        visible={visibleModal}
                        style={{}}
                        onRequestClose={() => setVisibleModal(false)}
                        transparent>

                        {/* Upper modal */}
                        <Animated.View style={[stylesReader.container_upper_modal, { position: 'absolute', elevation: 2, zIndex: 2, transform: [{ translateY: AnimUpperModalValue }] }]}>

                            {/* Icon back */}
                            <TouchableOpacity onPress={() => goBack()} >
                                <MaterialIcons name="keyboard-backspace" size={36} color="white" />
                            </TouchableOpacity>
                            {/* Book title */}
                            <Text style={stylesReader.title}>{truncateTitle(book.title)}</Text>
                            <TouchableOpacity onPress={() => ShowHideSettings()} >
                                <Ionicons name="settings-outline" size={32} color={visibleSettings ? redRarity : 'white'} />
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Gray View */}
                        <Pressable onPress={ShowHideModal} style={{ flex: 1, elevation: 1, zIndex: 1, backgroundColor: '#000', opacity: .7 }} />

                        {/* Lower modal */}
                        <Animated.View style={[stylesReader.container_lower_modal, { position: 'absolute', elevation: 2, zIndex: 2, transform: [{ translateY: AnimLowerModalValue.interpolate({ inputRange: [0, 100], outputRange: [0, 70] }) }] }]}>
                            {!visibleSettings ?
                                <>
                                    <Text style={stylesReader.text_pages_medium}>{currentPage} из
                                        <Text style={stylesReader.text_pages_bold}> {bookPages}</Text> стр.</Text>
                                </>
                                :
                                <View style={{ width: '100%', paddingTop: 10 }}>

                                    {/* Theme settings */}
                                    <View style={{ paddingLeft: 13, paddingRight: 13, borderBottomWidth: 1, borderBottomColor: 'white', paddingBottom: 15 }}>
                                        <Text style={stylesReader.h1_settings}>Тема</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                                            {/* White theme */}
                                            <Pressable onPress={() => switchTheme(0)} style={[stylesReader.theme_item, { backgroundColor: 'white', borderColor: readerTheme === 'white' ? redRarity : 'black' }]}>
                                                <Text style={stylesReader.theme_item_white_text}>Аа</Text>
                                            </Pressable>

                                            {/* Yellow theme */}
                                            <Pressable onPress={() => switchTheme(1)} style={[stylesReader.theme_item, { backgroundColor: themeYellow, borderColor: readerTheme === themeYellow ? redRarity : 'black' }]}>
                                                <Text style={stylesReader.theme_item_yellow_text}>Аа</Text>
                                            </Pressable>

                                            {/* Black theme */}
                                            <Pressable onPress={() => switchTheme(2)} style={[stylesReader.theme_item, { backgroundColor: 'black', borderColor: readerTheme === 'black' ? redRarity : 'black' }]}>
                                                <Text style={stylesReader.theme_item_black_text}>Аа</Text>
                                            </Pressable>
                                        </View>
                                    </View>

                                    {/* Font size settings */}
                                    <View style={{ width: '100%', marginTop: 10, paddingLeft: 13, paddingRight: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'white', paddingBottom: 15 }}>
                                        <Text style={stylesReader.h1_settings}>Размер шрифта</Text>
                                        <View style={{ flexDirection: 'row', gap: 8 }}>
                                            {/* Btn decrease font size */}
                                            <TouchableOpacity onPress={() => decreaseFontSize()} style={stylesReader.btn_settings}>
                                                <AntDesign name="minus" size={24} color="black" />
                                            </TouchableOpacity>

                                            {/* Btn increase font size */}
                                            <TouchableOpacity onPress={() => increaseFontSize()} style={stylesReader.btn_settings}>
                                                <AntDesign name="plus" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* Fields text settings */}
                                    <View style={{ width: '100%', marginTop: 10, paddingLeft: 13, paddingRight: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={stylesReader.h1_settings}>Поля</Text>
                                        <View style={{ flexDirection: 'row', gap: 8 }}>
                                            {/* Btn decrease field text */}
                                            <TouchableOpacity onPress={() => decreasePaddingSize()} style={stylesReader.btn_settings}>
                                                <Image style={stylesReader.icn_field} source={srcIcnFieldDec} />
                                            </TouchableOpacity>

                                            {/* Btn increase field text */}
                                            <TouchableOpacity onPress={() => increasePaddingSize()} style={stylesReader.btn_settings}>
                                                <Image style={stylesReader.icn_field} source={srcIcnFieldInc} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                            }

                        </Animated.View>
                    </Modal>
                </GestureHandlerRootView>

            </ScrollView>
        </>
    );
}