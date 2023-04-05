import axios from "axios";
import { getTokenAS, setTokenAS } from "./asyncStorage";
import { TBook } from "../types";
import { baseURL } from "../constants";
axios.defaults.baseURL = baseURL + '/api';

export async function Register(userLogin: string, userPassword: string, userNickname: string): Promise<number> {
    return await axios.post('/auth/register',
        {
            login: userLogin,
            password: userPassword,
            nickname: userNickname
        })
        .catch(error => error.response.status);
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
        .catch(error => error.response.status);
}

export async function GetBook(id: string): Promise<TBook | string> {
    const token = await getTokenAS();
    if (!token) return '401';
    return await axios.get('/books/getBook?id=' + id,
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => response.data)
        .catch(error => error.response.status)
}

export async function GetFavorites() {
    const token = await getTokenAS();
    if (!token) return '401';
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
    if (!token) return '401';
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

export async function DownloadBook(id: string) {
    const token = await getTokenAS();
    if (!token) return '401';
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
    if (!token) return '401';
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