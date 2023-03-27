export { TAllBook, TBook, TLibBook, TShopBook, LibStackParams, ProfileStackParams, ShopStackParams };

type TShopBook = {
    id: string,
    title: string,
    author: string,
    cover: string,
    price?: number,
}

type TLibBook = {
    id: string,
    title: string,
    author: string,
    cover: string,
    bookPages: number,
    currentPage: number,
    readPages: number,
    readDate: Date,
    isRead: boolean,
    fileName: string
}

type TBook = {
    id: string,
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
    id: string,
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

type LibStackParams = {
    Library: undefined;
    Reader: { book: TLibBook };
};

type ProfileStackParams = {
    Profile: undefined;
    DailyTask: undefined;
    Achievements: undefined;
};

type ShopStackParams = {
    Shop: undefined;
    ShopBook: undefined;
    Favorites: undefined;
    Checkout: undefined;
};


