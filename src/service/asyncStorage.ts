import AsyncStorage from '@react-native-async-storage/async-storage';
import { TDailyTask, TLibBook, TUserData } from '../types';

const userDataKey = 'userData'; // key for userData in async storage

//* Book stats functions
// save books to async storage
export function setBookStatsAS(book: TLibBook) {
    AsyncStorage.setItem((book.id).toString(), JSON.stringify(book));
}

// save book names to async storage
export function setBookNamesAS(bookNames: string[]) {
    AsyncStorage.setItem('shopBookNames', JSON.stringify(bookNames));
}

export async function getBookNamesAS(): Promise<string[]> {
    return JSON.parse(await AsyncStorage.getItem('shopBookNames') || '[]');
}

// update book statistics: currentPage and readPages in async storage 
export function updateBookReadPagesAS(id: string, readPages: number) {
    AsyncStorage.mergeItem(id, `{readPages:${readPages}}`);
}

// update book statistics: currentPage and readPages in async storage 
export function updateBookCurrentPageAS(id: string, currentPage: number) {
    AsyncStorage.mergeItem(id, `{currentPage:${currentPage}}`);
}

// update book statistic: readDate in async storage 
export function updateBookReadDateAS(id: string) {
    const date = new Date();
    AsyncStorage.mergeItem(id, `{readDate:"${date}"}`);
}

// set isRead = true; set currentPage and readPages to bookPages in async storage 
export function setBookIsReadAS(id: string, pages: number) {
    AsyncStorage.mergeItem(id, `{isRead:true, currentPage: ${pages}, readPages: ${pages}}`);
    incUserReadBooksAS();
}

// set bookPages to book added from file in async storage 
export function setFileBookPagesAS(id: string, pages: number) {
    AsyncStorage.mergeItem(id, `{bookPages:${pages}}`);
}

// get all books added from file from async storage
export async function getAllBooksAS(bookNames: string[]): Promise<TLibBook[]> {
    let books: TLibBook[] = [];
    for (let name of bookNames) {
        const book = await AsyncStorage.getItem(name);
        if (book) {
            books.push(JSON.parse(book));
        }
    }
    return books;
}

// // save all bought books to async storage
//export async function setAllShopBooksAS(booksArray: TLibBook[]) {
//     for (let book of booksArray) {
//         AsyncStorage.setItem(book.id, JSON.stringify(book));
//     }
// }

// // get all bought books from async storage
// export async function getAllShopBooksAS(bookNames: string[]): Promise<TLibBook[]> {
//     let books: TLibBook[] = [];
//     for (let name of bookNames) {
//         const book = await AsyncStorage.getItem(name);
//         if (book) {
//             books.push(JSON.parse(book));
//         }
//     }
//     return books;
// }

//* User data functions 

export async function getUserDataAS(): Promise<TUserData | null> {

    //? test set user data
    // await AsyncStorage.setItem('userData', JSON.stringify({
    //     nickname: 'TULENb',
    //     readPagesNum: 0,
    //     readBooksNum: 0,
    //     achievesImg: [],
    //     userBooks: [],
    // }));
    // AsyncStorage.setItem('todayPages', '0');

    return JSON.parse(await AsyncStorage.getItem(userDataKey) || 'null');
}

export function setUserDataAS(user: TUserData) {
    AsyncStorage.setItem(userDataKey, JSON.stringify(user));
}

export async function getUserPagesAS(): Promise<number> {
    const userData = await getUserDataAS();
    return userData?.readPagesNum || 0;
}

export async function incUserReadPagesAS(inc: number) {
    const pages = await getUserPagesAS() + inc;
    AsyncStorage.mergeItem(userDataKey, `{readPagesNum:${pages}}`);
}

export async function incUserReadBooksAS() {
    const userData = await getUserDataAS();
    if (userData) {
        AsyncStorage.mergeItem(userDataKey, `{readBooksNum:${userData.readBooksNum + 1}}`);
    }
}


//* Daily task functions
// Get number of pages to complete daily task
export async function getDailyTaskAS(): Promise<TDailyTask> {
    return JSON.parse(await AsyncStorage.getItem('dailyTask') || '60');
}

export async function getNewDailyTaskAS(): Promise<TDailyTask> {
    return JSON.parse(await AsyncStorage.getItem('newDailyTask') || '60');
}

export async function setDailyTaskAS(dailyTask: TDailyTask, todayPages: number) {
    AsyncStorage.setItem('newDailyTask', dailyTask.toString());
    if (todayPages == 0) {
        AsyncStorage.setItem('dailyTask', dailyTask.toString());
    }
}

// Get number of pages read today
export async function getTodayPagesAS(): Promise<number> {
    return JSON.parse(await AsyncStorage.getItem('todayPages') || '0');
}

export async function incTodayPagesAS(inc: number) {
    const pages = await getTodayPagesAS() + inc;
    AsyncStorage.setItem('todayPages', pages.toString());
    checkDailyTaskCompletionAS(pages);
}

export async function checkDailyTaskCompletionAS(todayPages: number) {
    const dailyTask: TDailyTask = await getDailyTaskAS();
    if (todayPages === dailyTask) {
        incUserReadPagesAS(dailyTask);
    }
}

// save current date to AS and update daily stats
export async function setTodayAS() {
    const oldDate = JSON.parse(await AsyncStorage.getItem('today') || '0');
    const date = new Date().setHours(0, 0, 0, 0); // get date without time
    AsyncStorage.setItem('today', date.toString());
    if (date !== oldDate) {
        // reset todayPages counter
        AsyncStorage.setItem('todayPages', '0');
        // update daily task
        const newTask = await getNewDailyTaskAS();
        AsyncStorage.setItem('dailyTask', newTask.toString());
    }
}


//* Api functions
// save user auth token to AS
export function setTokenAS(token: string) {
    AsyncStorage.setItem('token', token);
}

export async function getTokenAS() {
    return await AsyncStorage.getItem('token');
}

export function clearTokenAS() {
    AsyncStorage.removeItem('token');
}

export function clearAS() {
    AsyncStorage.clear();
}

