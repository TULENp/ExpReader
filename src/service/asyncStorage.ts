import AsyncStorage from '@react-native-async-storage/async-storage';
import { TBookStats, TDailyTask, TLibBook, TUserData } from '../types';
import { checkBooksAchieves, checkPagesAchieves } from './motivation';

const userDataKey = 'userData'; // key for userData in async storage

//* Book stats 
// save books to async storage
export function setBookStatsAS(book: TLibBook) {
    AsyncStorage.setItem((book.id).toString(), JSON.stringify(book));
}

// save book names to async storage
export function setBookKeysAS(bookNames: string[]) {
    AsyncStorage.setItem('shopBookNames', JSON.stringify(bookNames));
}

export async function getBookNamesAS(): Promise<string[]> {
    return JSON.parse(await AsyncStorage.getItem('shopBookNames') || '[]');
}

// update book statistics: currentPage and readPages in async storage 
export async function updateBookReadPagesAS(id: string, readPages: number) {
    await AsyncStorage.mergeItem(id, `{readPages:${readPages}}`);
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

// set bookPages in async storage 
export function setFileBookPagesAS(id: string, pages: number) {
    AsyncStorage.mergeItem(id, `{bookPages:${pages}}`);
}

// get all book stats from async storage
export async function getUserBookStatsAS(bookNames: string[]): Promise<TBookStats[]> {
    let booksStats: TBookStats[] = [];
    for (let name of bookNames) {
        const bookJSON = await AsyncStorage.getItem(name);
        if (bookJSON) {
            const { id, readPages, currentPage, isRead, readDate }: TLibBook = JSON.parse(bookJSON);
            booksStats.push({
                bookID: id,
                readPages: readPages,
                currentPage: currentPage,
                isRead: isRead,
                readDate: readDate
            });
        }
    }
    return booksStats;
}

// get all books from async storage
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


//* User data  

export async function getUserDataAS(): Promise<TUserData | null> {
    // AsyncStorage.removeItem(userDataKey);
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

    checkPagesAchieves(pages);
}

export async function incUserReadBooksAS() {
    const userData = await getUserDataAS();
    if (userData) {
        const books = userData.readBooksNum + 1;
        AsyncStorage.mergeItem(userDataKey, `{readBooksNum:${books}}`);

        checkBooksAchieves(books);
    }
}


//* Daily task 
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

//* Achievements

export function setAchievesStatusAS(achieves: boolean[]) {
    AsyncStorage.setItem('achieves', JSON.stringify(achieves));
}

export async function getAchievesStatusAS() {
    // AsyncStorage.removeItem('achieves');
    let achieves: boolean[] = [false, false, false, false, false];
    const res = await AsyncStorage.getItem('achieves');
    if (res) {
        achieves = JSON.parse(res);
    }
    return achieves;
}

//Reader settings
export function getThemeSettings(){
    let res:string | null = '';
    AsyncStorage.getItem('readerTheme').then(async (value)=> res= value)
    return res;
}

export function setThemeSettings(theme:string){
    AsyncStorage.setItem('readerTheme',theme);
}


//* Api 
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

