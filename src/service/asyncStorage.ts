import AsyncStorage from '@react-native-async-storage/async-storage';
import { TLibBook } from '../types';

// save books to async storage
function saveBookStatsAS(book: TLibBook) {
    AsyncStorage.setItem(book.id, JSON.stringify(book));
}

// update book statistics: currentPage and readPages in async storage 
function updateBookReadStatsAS(id: string, currentPage: number, readPages: number) {
    AsyncStorage.mergeItem(id, `{currentPage:${currentPage}, readPages:${readPages}}`);
}

// update book statistic: readDate in async storage 
function updateBookReadDateAS(id: string) {
    const date = new Date();
    AsyncStorage.mergeItem(id, `{readDate:"${date}"}`);
}

// set isRead = true; set currentPage and readPages to bookPages in async storage 
function setBookIsReadAS(id: string, pages: number) {
    AsyncStorage.mergeItem(id, `{isRead:true, currentPage: ${pages}, readPages: ${pages}}`);
}

// set bookPages to book added from file in async storage 
function setFileBookPagesAS(id: string, pages: number) {
    AsyncStorage.mergeItem(id, `{bookPages:${pages}}`);
}

// Get all books added from file from async storage
async function getAllFileBooksAS(bookNames: string[]): Promise<TLibBook[]> {
    let books: TLibBook[] = [];
    for (let name of bookNames) {
        const book = await AsyncStorage.getItem(name);

        if (book) {
            books.push(JSON.parse(book));
        }
    }
    return books;
}

function clearAS() {
    AsyncStorage.clear();
}

export {
    saveBookStatsAS,
    getAllFileBooksAS,
    clearAS,
    updateBookReadStatsAS,
    setBookIsReadAS,
    updateBookReadDateAS,
    setFileBookPagesAS
};