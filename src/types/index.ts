export { TAllBook, TBook, TLibBook, TShopBook };

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
    fileName:string
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


