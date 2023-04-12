import { Button, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { pageChars } from '../constants';
import { useRoute, RouteProp } from '@react-navigation/native';

type FragmentParams = {
    fragment: string;
}

export function FragmentReaderScreen() {
    const { fragment } = useRoute<RouteProp<Record<string, FragmentParams>, string>>().params; // get book text from params
    const bookPages = Math.ceil(fragment.length / pageChars); // number of pages in book
    const [pageText, setPageText] = useState(''); // text on one page
    const [currentPage, setCurrentPage] = useState(1); // starts from 1, not from 0

    useEffect(() => {
        readCurrentPage();
    }, [currentPage])

    function readCurrentPage() {
        if (fragment) {
            const pageFirstCharNum: number = (currentPage - 1) * pageChars; // number of the first char of current page
            const nextPageFirstCharNum: number = pageFirstCharNum + pageChars; // number of the last char of current page
            let text: string = '';

            let index: number = pageFirstCharNum;
            // is needed to skip a piece of the last word, and read the next word from the beginning
            if (index !== 0) { // only if its not the first word of the book
                while (fragment[index] !== ' ' && index < fragment.length) {
                    index++;
                }
                index++; // to avoid space
            }
            // read the whole page
            while (index < nextPageFirstCharNum && index < fragment.length) {
                text += fragment[index];
                index++
            }
            // is needed to read the last word completely
            while (fragment[index] !== ' ' && index < fragment.length) {
                text += fragment[index];
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
            setCurrentPage(prev => prev + 1);
        }
    }

    function toPrevPage() {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }

    return (
        <>
            {/* TODO remove scroll animation */}
            <ScrollView >
                <Text style={{ alignSelf: 'center', fontSize: 25, margin: 10 }}>{pageText}</Text>
            </ScrollView>
            <View >
                <Button title={'<'} onPress={toPrevPage} />
                <Text style={{ alignSelf: 'center', fontSize: 15 }}>{currentPage}/{bookPages}</Text>
                <Button title={'>'} onPress={toNextPage} />
            </View>
        </>
    );
}