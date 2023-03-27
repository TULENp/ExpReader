import * as FileSystem from 'expo-file-system';

//average number of characters per page in a real book
const realBookPageChars = 1800;
// number of chars in one page
const pageChars: number = 600;

const fileBooksDir: string = FileSystem.documentDirectory + 'fileBooks/'; // directory for books added from file

export { fileBooksDir, pageChars, realBookPageChars };

