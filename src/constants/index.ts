import * as FileSystem from 'expo-file-system';

//average number of characters per page in a real book
const realBookPageChars: number = 1800;
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


export { fileBooksDir, booksDir, pageChars, realBookPageChars, imageURL, baseURL, coversDir };

