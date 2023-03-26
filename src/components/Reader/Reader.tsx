import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { pageChars } from '../../constants';
import { saveBookStats, updateReadBookStats } from '../../service/asyncStorage';
import { TLibBook } from '../../types';

interface ReaderProps {
    bookText: string;
    book: TLibBook;
}

//TODO update book stats in AS
export function Reader({ bookText, book }: ReaderProps) {

    const [pageText, setPageText] = useState(''); // text on one page
    const [currentPage, setCurrentPage] = useState(book.currentPage); // starts from 1, not from 0
    //TODO optimize rerender
    const bookPages = book.bookPages || Math.ceil(bookText.length / pageChars); // number of pages in book
    const scrollViewRef = useRef<ScrollView>(null); // ref to ScrollView with pageText

    useEffect(() => {
        scrollToTop();
        readCurrentPage();
        updateReadBookStats(book.id, currentPage, currentPage);
    }, [currentPage])

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
            setCurrentPage(currentPage + 1);
        }
    }

    function toPrevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
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
                <Text style={{ alignSelf: 'center', fontSize: 15 }}>{currentPage}/{bookPages}</Text>
                <Button title={'>'} onPress={toNextPage} />
            </View>
        </>
    )

}

