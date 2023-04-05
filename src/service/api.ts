import axios from "axios";
import { getTokenAS, setTokenAS } from "./asyncStorage";
import { TBook } from "../types";

axios.defaults.baseURL = 'https://exp-reader-backend.vercel.app/api';
// const api = axios.create({
//     baseURL: "https://exp-reader-backend.vercel.app/api",
// });

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

export async function GetBook(bookId: string): Promise<TBook | string> {
    const token = await getTokenAS();
    if (!token) return '401';
    return await axios.get('/books/getBook?id=' + bookId,
        {
            headers: {
                Authorization: token
            }
        })
        .then(response => response.data)
        .catch(error => error.response.status)
}