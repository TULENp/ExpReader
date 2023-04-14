
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Button, AppState } from 'react-native';
import { pageChars } from '../../constants';
import {
    getAllBooksAS,
    getBookNamesAS,
    getUserBookStatsAS,
    incTodayPagesAS,
    incUserReadPagesAS,
    setBookIsReadAS,
    setFileBookPagesAS,
    updateBookCurrentPageAS,
    updateBookReadDateAS,
    updateBookReadPagesAS,
} from '../../service/asyncStorage';
import { TLibBook } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { checkBookmarkReward } from '../../service/motivation';
import { UpdateUserBookStats } from '../../service/api';

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

    const [sessionPages, setSessionPages] = useState<number>(0); // number of pages read today
    const [pageText, setPageText] = useState(''); // text on one page
    const [currentPage, setCurrentPage] = useState(book.currentPage); // starts from 1, not from 0
    const [readPages, setReadPages] = useState(book.readPages); // number of book pages read
    const [readTimer, setReadTimer] = useState<NodeJS.Timeout | null>(null) // timer after which the page is considered read

    useEffect(() => {
        if (bookPages !== book.bookPages) {
            setFileBookPagesAS(id, bookPages);
        }
        updateBookReadDateAS(id);
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

        //TODO update user stats too
        updateUserBookStats();
    }

    // Update data in backend
    async function updateUserBookStats() {
        const bookNames = await getBookNamesAS();
        const booksStats = await getUserBookStatsAS(bookNames);
        UpdateUserBookStats(booksStats);
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

    return (
        <>
            {/* TODO remove scroll animation */}
            <ScrollView ref={scrollViewRef} >
                <Text style={{ alignSelf: 'center', fontSize: 25, margin: 10 }}>{pageText}</Text>
            </ScrollView>
            <View >
                <Button title={'<'} onPress={toPrevPage} />
                <Text style={{ alignSelf: 'center', fontSize: 15 }}>{currentPage}/{bookPages}. {readPages}</Text>
                <Button title={'>'} onPress={toNextPage} />
            </View>
        </>
    );
}