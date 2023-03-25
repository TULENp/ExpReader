import AsyncStorage from '@react-native-async-storage/async-storage';
import { TLibBook } from '../types';

//save books added from file to async storage
function saveFileBooksToStorage(book: TLibBook) {
    AsyncStorage.setItem('book_' + book.title, JSON.stringify(book));
}

//Get all books added from file from async storage
async function getFileBooksFromStorage(bookNames: string[]): Promise<TLibBook[]> {
    let books: TLibBook[] = [];
    for (let name of bookNames) {
        const book = await AsyncStorage.getItem('book_' + name);

        if (book) {
            books.push(JSON.parse(book));
        }
    }
    return books;
}

function clearStorage() {
    AsyncStorage.clear();
}

export { saveFileBooksToStorage, getFileBooksFromStorage, clearStorage };