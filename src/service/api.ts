import axios from "axios";
import { getTokenAS, setBookKeysAS, setBookStatsAS, setTokenAS, setUserDataAS } from "./asyncStorage";
import { TBook, TBookStats, TLibBook, TRarity, TUserData } from "../types";
import { baseURL } from "../constants";
import { TFilters } from "../screens/ShopScreen";
axios.defaults.baseURL = baseURL + '/api';

//* Auth 

export async function Register(userLogin: string, userPassword: string, userNickname: string): Promise<string> {
    let status = '200';
    await axios.post('/auth/register',
        {
            login: userLogin,
            password: userPassword,
            nickname: userNickname
        })
        .catch(error => status = error.response.data);
    return status;
}

export async function SignIn(userLogin: string, userPassword: string) {
    return await axios.post('/auth/login',
        {
            login: userLogin,
            password: userPassword
        })
        .then(response => {
            setTokenAS(response.data.token);
        })
        .catch(error => error.response.data);
}


//* User 

export async function GetUserData(): Promise<TUserData | string> {
    let status = '200';
    const token = await getTokenAS();
    if (!token) return '401';
    await axios.get('/user/getUserData',
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => setUserDataAS(response.data))
        .catch(error => status = error.response.status);
    return status;
}

export async function UpdateUserStats(userData: TUserData) {
    const token = await getTokenAS();
    if (!token) return 401;

    return await axios.post('user/updateUserData',
        {
            userReadPages: userData.readPagesNum,
            userReadBooks: userData.readBooksNum,
            achieves: userData.achievements
        },
        {
            headers: {
                Authorization: token
            }
        })
        .catch(error => error.response.status);
}

export async function UpdateUserBookStats(bookStats: TBookStats[]) {
    const token = await getTokenAS();
    if (!token) return 401;

    return await axios.post('user/updateUserBookStat',
        {
            UBStat: bookStats
        },
        {
            headers: {
                Authorization: token
            }
        })
        .catch(error => error.response.status);
}


//* Book 

export async function GetBook(id: string): Promise<TBook | number> {
    const token = await getTokenAS();
    if (!token) return 401;

    return await axios.get('/books/getBook?id=' + id,
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => response.data)
        .catch(error => error.response.status)
}

export async function DownloadBook(id: string) {
    const token = await getTokenAS();
    if (!token) return 401;

    return await axios.post('/books/downloadBook',
        {
            bookId: id
        },
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => response.data)
        .catch(error => error.response.status);
}

export async function BuyBook(id: string) {
    let status = '200';
    const token = await getTokenAS();
    if (!token) return '401';

    await axios.post('/books/buyABook',
        {
            bookId: id
        },
        {
            headers: {
                Authorization: token
            }
        })
        .catch(error => status = error.response.data);
    return status;
}

export async function GetAllLibBooks(): Promise<TLibBook[] | string> {
    let status = '200';
    const token = await getTokenAS();
    if (!token) return '401';
    await axios.get('/books/getLibBooks',
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            // save books to AS
            const bookKeys: string[] = [];
            for (let book of response.data) {
                setBookStatsAS(book);
                bookKeys.push((book.id).toString());
            }
            setBookKeysAS(bookKeys);
        })
        .catch(error => status = error.response.status)
    return status;
}

export async function GetAllShopBooks(filter: TFilters) {
    const token = await getTokenAS();
    if (!token) return 401;

    return await axios.post('/books/getFilteredBooks',
        {
            sortID: Number(filter.sortID),
            rarity: filter.rarity,
            searchValue: filter.searchValue,
            genres: filter.genres
        },
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => response.data)
        .catch(error => error.response.status)
}

export async function GetRecommendedBooks() {
    const token = await getTokenAS();
    if (!token) return 401;

    return await axios.get('/books/getRecommendedBooks',
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => response.data)
        .catch(error => error.response.status)
}


//* Favorites 

export async function GetFavorites() {
    const token = await getTokenAS();
    if (!token) return 401;

    return await axios.get('/fav/showFav',
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => response.data)
        .catch(error => error.response.status);
}

export async function SwitchFavorite(id: string) {
    const token = await getTokenAS();
    if (!token) return 401;

    return await axios.post('/fav/switchFav',
        {
            bookId: id
        },
        {
            headers: {
                Authorization: token
            }
        })
        .catch(error => error.response.status);
}


