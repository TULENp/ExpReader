import * as FileSystem from 'expo-file-system';

// number of characters in one page
const pageChars: number = 600;
// directory for books added from file
const fileBooksDir: string = FileSystem.documentDirectory + 'fileBooks/';
// directory for books added from shop
const booksDir: string = FileSystem.documentDirectory + 'shopBooks/';
// directory for book covers
const coversDir: string = FileSystem.documentDirectory + 'covers/';

// url to server
const baseURL = 'https://exp-reader-backend.vercel.app';
// url to images 
const imageURL = baseURL + '/public/covers/';


export { fileBooksDir, booksDir, pageChars, imageURL, baseURL, coversDir };

