import * as FileSystem from 'expo-file-system';
import { booksDir, fileBooksDir, imageURL, coversDir } from '../constants';
import { DownloadBook } from './api';
import { TLibBook } from '../types';


export async function checkBookIsDownloaded(fileName: string) {
    let isDownloaded = false;
    const shopBookInfo: FileSystem.FileInfo = (await FileSystem.getInfoAsync(booksDir + fileName));
    const fileBookInfo: FileSystem.FileInfo = (await FileSystem.getInfoAsync(fileBooksDir + fileName));
    if (shopBookInfo.exists || fileBookInfo.exists) {
        isDownloaded = true;
    }
    return isDownloaded
}

//TODO add download loading
export async function downloadBook(book: TLibBook) {
    const res = await DownloadBook(book.id);
    await FileSystem.writeAsStringAsync(booksDir + book.fileName, res);
    await FileSystem.downloadAsync(imageURL + book.cover, coversDir + book.cover);
    return true;
}

//TODO remove deleteBook func on build ver
export async function deleteBook(book: TLibBook) {
    await FileSystem.deleteAsync(booksDir + book.fileName, { idempotent: true });
    await FileSystem.deleteAsync(coversDir + book.cover, { idempotent: true });
    console.log('deleted');
    return false;
}