import AsyncStorage from '@react-native-async-storage/async-storage';
import { TDailyTask, TLibBook, TUserData } from '../types';

export {
    saveBookStatsAS,
    getAllFileBooksAS,
    clearAS,
    setBookIsReadAS,
    updateBookReadDateAS,
    setFileBookPagesAS,
    getUserDataAS,
    incTodayPagesAS,
    getTodayPagesAS,
    getDailyTaskAS,
    setDailyTaskAS,
    incUserReadPagesAS,
    getUserPagesAS,
    updateBookReadPagesAS,
    updateBookCurrentPageAS,
    setTodayAS,
    getNewDailyTaskAS,
    setTokenAS,
    getTokenAS
};

const userDataKey = 'userData'; // key for userData in async storage

//* Book stats functions
// save books to async storage
function saveBookStatsAS(book: TLibBook) {
    AsyncStorage.setItem(book.id, JSON.stringify(book));
}

// update book statistics: currentPage and readPages in async storage 
function updateBookReadPagesAS(id: string, readPages: number) {
    AsyncStorage.mergeItem(id, `{readPages:${readPages}}`);
}

// update book statistics: currentPage and readPages in async storage 
function updateBookCurrentPageAS(id: string, currentPage: number) {
    AsyncStorage.mergeItem(id, `{currentPage:${currentPage}}`);
}

// update book statistic: readDate in async storage 
function updateBookReadDateAS(id: string) {
    const date = new Date();
    AsyncStorage.mergeItem(id, `{readDate:"${date}"}`);
}

// set isRead = true; set currentPage and readPages to bookPages in async storage 
function setBookIsReadAS(id: string, pages: number) {
    AsyncStorage.mergeItem(id, `{isRead:true, currentPage: ${pages}, readPages: ${pages}}`);
    incUserReadBooksAS();
}

// set bookPages to book added from file in async storage 
function setFileBookPagesAS(id: string, pages: number) {
    AsyncStorage.mergeItem(id, `{bookPages:${pages}}`);
}

// get all books added from file from async storage
async function getAllFileBooksAS(bookNames: string[]): Promise<TLibBook[]> {
    let books: TLibBook[] = [];
    for (let name of bookNames) {
        const book = await AsyncStorage.getItem(name);
        if (book) {
            books.push(JSON.parse(book));
        }
    }
    return books;
}


//* User data functions 

async function getUserDataAS(): Promise<TUserData | null> {

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

async function getUserPagesAS(): Promise<number> {
    const userData = await getUserDataAS();
    return userData?.readPagesNum || 0;
}

async function incUserReadPagesAS(inc: number) {
    const pages = await getUserPagesAS() + inc;
    AsyncStorage.mergeItem(userDataKey, `{readPagesNum:${pages}}`);
}

async function incUserReadBooksAS() {
    const userData = await getUserDataAS();
    if (userData) {
        AsyncStorage.mergeItem(userDataKey, `{readBooksNum:${userData.readBooksNum + 1}}`);
    }
}


//* Daily task functions
// Get number of pages to complete daily task
async function getDailyTaskAS(): Promise<TDailyTask> {
    return JSON.parse(await AsyncStorage.getItem('dailyTask') || '60');
}

async function getNewDailyTaskAS(): Promise<TDailyTask> {
    return JSON.parse(await AsyncStorage.getItem('newDailyTask') || '60');
}

async function setDailyTaskAS(dailyTask: TDailyTask, todayPages: number) {
    AsyncStorage.setItem('newDailyTask', dailyTask.toString());
    if (todayPages == 0) {
        AsyncStorage.setItem('dailyTask', dailyTask.toString());
    }
}

// Get number of pages read today
async function getTodayPagesAS(): Promise<number> {
    return JSON.parse(await AsyncStorage.getItem('todayPages') || '0');
}

async function incTodayPagesAS(inc: number) {
    const pages = await getTodayPagesAS() + inc;
    AsyncStorage.setItem('todayPages', pages.toString());
    checkDailyTaskCompletionAS(pages);
}

async function checkDailyTaskCompletionAS(todayPages: number) {
    const dailyTask: TDailyTask = await getDailyTaskAS();
    if (todayPages === dailyTask) {
        incUserReadPagesAS(dailyTask);
    }
}

// save current date to AS and update daily stats
async function setTodayAS() {
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
function setTokenAS(token: string) {
    AsyncStorage.setItem('token', token);
}

async function getTokenAS() {
    return await AsyncStorage.getItem('token');
}

function clearAS() {
    AsyncStorage.clear();
}

