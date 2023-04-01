
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Button, AppState } from 'react-native';
import { pageChars } from '../../constants';
import {
    incTodayPagesAS,
    incUserReadPagesAS,
    setBookIsReadAS,
    setFileBookPagesAS,
    updateBookReadDateAS,
    updateBookReadStatsAS
} from '../../service/asyncStorage';
import { TLibBook } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { checkBookmarkReward } from '../../service/motivation';

interface ReaderProps {
    bookText: string;
    book: TLibBook;
}

export function Reader({ bookText, book }: ReaderProps) {
    const scrollViewRef = useRef<ScrollView>(null); // ref to ScrollView with pageText
    const navigation = useNavigation();
    const bookPages = book.bookPages || Math.ceil(bookText.length / pageChars); // number of pages in book

    const [sessionPages, setSessionPages] = useState<number>(0); // number of pages read today

    const [pageText, setPageText] = useState(''); // text on one page
    const [currentPage, setCurrentPage] = useState(book.currentPage); // starts from 1, not from 0
    const [readPages, setReadPages] = useState(book.readPages); // number of book pages read


    useEffect(() => {
        if (bookPages !== book.bookPages) {
            setFileBookPagesAS(book.id, bookPages);
        }
        updateBookReadDateAS(book.id);
    }, []);

    useEffect(() => {
        scrollToTop();
        readCurrentPage();

        // Called when the application goes into the background
        const subscription = AppState.addEventListener('change', appState => {
            if (appState == 'background') {
                updateASData();
            }
        });
        // Called just before the component is destroyed
        const unsubscribe = navigation.addListener('beforeRemove', () => updateASData());

        return () => {
            unsubscribe();
            subscription.remove();
        };
    }, [currentPage, sessionPages]);

    useEffect(() => {
        // Read last page
        if ((readPages + 1) === bookPages) {
            setBookIsReadAS(book.id, bookPages);
            setReadPages(prev => prev + 1);
            setSessionPages(prev => prev + 1);
        }

        if (sessionPages !== 0) {
            checkBookmarkReward(readPages, bookPages);
        }
    }, [readPages])


    // Update data in async storage
    function updateASData() {
        updateBookReadStatsAS(book.id, currentPage, readPages);
        if (sessionPages !== 0) {
            incUserReadPagesAS(sessionPages);
            incTodayPagesAS(sessionPages);

            setSessionPages(0);
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

    //TODO add read timer 
    function toNextPage() {
        if (currentPage < bookPages) {
            if (currentPage === readPages + 1) {
                setReadPages(prev => prev + 1);
            }
            setSessionPages(prev => prev + 1);
            setCurrentPage(prev => prev + 1);
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