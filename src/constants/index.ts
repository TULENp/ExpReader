import * as FileSystem from 'expo-file-system';

const pageChars: number = 600; // number of chars in one page 

const fileBooksDir: string = FileSystem.documentDirectory + 'fileBooks/'; // directory for books added from file

export { fileBooksDir, pageChars };
