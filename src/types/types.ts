export type TShopBook = {
    id: number,
    title: string,
    author: string,
    cover: string,
    price?: number,
}

export type TLibBook = {
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

export type TBigBook = {
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

export type TBook = {
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
