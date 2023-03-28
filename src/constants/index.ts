import * as FileSystem from 'expo-file-system';

//average number of characters per page in a real book
const realBookPageChars: number = 1800;
// number of characters in one page
const pageChars: number = 600;
// directory for books added from file
const fileBooksDir: string = FileSystem.documentDirectory + 'fileBooks/';
// directory for books added from shop
const booksDir: string = FileSystem.documentDirectory + 'books/';

export { fileBooksDir, booksDir, pageChars, realBookPageChars };

