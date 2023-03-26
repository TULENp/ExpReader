import AsyncStorage from '@react-native-async-storage/async-storage';
import { TLibBook } from '../types';

// save books to async storage
function saveBookStats(book: TLibBook) {
    AsyncStorage.setItem(book.id, JSON.stringify(book));
}

// update book statistics in async storage 
function updateBookStats(book: TLibBook) {
    AsyncStorage.mergeItem(book.id, JSON.stringify(book));
}

// Get all books added from file from async storage
async function getFileBooksFromStorage(bookNames: string[]): Promise<TLibBook[]> {
    let books: TLibBook[] = [];
    for (let name of bookNames) {
        const book = await AsyncStorage.getItem(name);

        if (book) {
            books.push(JSON.parse(book));
        }
    }
    return books;
}



function clearStorage() {
    AsyncStorage.clear();
}

export { saveBookStats as saveFileBooksToStorage, getFileBooksFromStorage, clearStorage };