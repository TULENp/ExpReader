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

    let userData: TUserData | null = null;
    const userDataJSON = await AsyncStorage.getItem(userDataKey);
    if (userDataJSON) {
        userData = JSON.parse(userDataJSON);
    }
    return userData;
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
    let dailyTask: TDailyTask = 60;
    const dailyTaskJSON = await AsyncStorage.getItem('dailyTask');
    if (dailyTaskJSON) {
        dailyTask = JSON.parse(dailyTaskJSON);
    }
    return dailyTask;
}

async function setDailyTaskAS(dailyTask: TDailyTask) {
    AsyncStorage.setItem('dailyTask', dailyTask.toString());
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

function clearAS() {
    AsyncStorage.clear();
}

