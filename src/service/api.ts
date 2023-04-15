import axios from "axios";
import { getTokenAS, setTokenAS } from "./asyncStorage";
import { TBook, TBookStats, TLibBook, TRarity, TUserData } from "../types";
import { baseURL } from "../constants";
axios.defaults.baseURL = baseURL + '/api';

//* Auth 

export async function Register(userLogin: string, userPassword: string, userNickname: string): Promise<number> {
    return await axios.post('/auth/register',
        {
            login: userLogin,
            password: userPassword,
            nickname: userNickname
        })
        .catch(error => error.response.data);
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

export async function GetUserData(): Promise<TUserData | number> {
    const token = await getTokenAS();
    if (!token) return 401;
    return await axios.get('/user/getUserData',
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => response.data)
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
    const token = await getTokenAS();
        if (!token) return 401;

    return await axios.post('/books/buyABook',
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

export async function GetAllLibBooks(): Promise<TLibBook[] | number> {
    const token = await getTokenAS();
    if (!token) return 401;
    return await axios.get('/books/getLibBooks',
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => response.data)
        .catch(error => error.response.status)
}

export async function GetAllShopBooks(sortId: 0 | 1 | 2 | 3, rarity: TRarity | null, searchValue: string, genres: string[] | null) {
    const token = await getTokenAS();
        if (!token) return 401;

    return await axios.post('/books/getFilteredBooks',
        {
            sortId: sortId,
            rarity: rarity,
            searchValue: searchValue,
            genres: genres
        },
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


