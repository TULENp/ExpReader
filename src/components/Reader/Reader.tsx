import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { pageChars } from '../../constants';
import { TLibBook } from '../../types';

interface ReaderProps {
    bookText: string;
    book: TLibBook;
}

export function Reader({ bookText, book }: ReaderProps) {

    const [pageText, setPageText] = useState(''); // text on one page
    const [currentPage, setCurrentPage] = useState(book.currentPage); // starts from 1, not from 0
    //TODO optimize rerender
    const bookPages = getBookPages(); // number of pages in book
    
    useEffect(() => {
        ReadCurrentPage();
    }, [currentPage])

    function getBookPages() {
        if (book.bookPages == 0) {
            return Math.ceil(bookText.length / pageChars)
        }
        return book.bookPages;
    }

    function ReadCurrentPage() {
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

    return (
        <>
            <ScrollView >
                <Text >{pageText}</Text>
            </ScrollView>

            <View >
                <Button title={'<'} onPress={toPrevPage} />
                <Text style={{ color: 'black', alignSelf: 'center' }}>{currentPage}/{bookPages}</Text>
                <Button title={'>'} onPress={toNextPage} />
            </View>
        </>
    )

}

