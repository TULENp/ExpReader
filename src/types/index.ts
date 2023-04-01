import { ImageSourcePropType } from "react-native";

export { TAllBook, TBook, TLibBook, TShopBook, TPin };

type TShopBook = {
    id: number,
    title: string,
    author: string,
    cover: string,
    price?: number,
}

type TLibBook = {
    id: number,
    title: string,
    author: string,
    cover: string,
    bookPages: number,
    currentPage: number,
    readPages: number,
    readDate: Date,
    isRead: boolean,
}

type TBook = {
    id: number,
    title: string,
    author: string,
    cover: string,
    price: number,
    bookPages: number,
    genre: string[],
    description: string,
    fragment: string,
    isFavorite: boolean,
}

type TAllBook = {
    id: number,
    title: string,
    author: string,
    cover: string,
    price: number,
    bookPages: number,
    currentPage: number,
    readPages: number,
    readDate: Date,
    isRead: boolean,
    genre: string[],
    description: string,
    fragment: string,
    isFavorite: boolean,
}

type TPin = {
    id:number,
    title:string,
    description:string,
    img:ImageSourcePropType,
    isGet:boolean,
}

