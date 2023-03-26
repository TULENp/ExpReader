import AsyncStorage from '@react-native-async-storage/async-storage';
import { TLibBook } from '../types';

// save books to async storage
function saveBookStats(book: TLibBook) {
    AsyncStorage.setItem(book.id, JSON.stringify(book));
}

// update book statistics: currentPage and readPages in async storage 
function updateReadBookStats(id: string, currentPage: number, readPages: number) {
    AsyncStorage.mergeItem(id, `{currentPage:${currentPage}, readPages:${readPages}}`);
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

export { saveBookStats, getFileBooksFromStorage, clearStorage, updateReadBookStats };