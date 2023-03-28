export {
    TBook,
    TLibBook,
    TShopBook,
    LibStackParams,
    ProfileStackParams,
    ShopStackParams,
    TRarity,
    TBookmark,
    TUserData,
    TAchieves,
};

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

type TRarity = 'common' | 'rare' | 'epic' | 'legendary';

type TBookmark = 'bookmark_empty' | 'bronze' | 'silver' | 'gold';

type TUserData = {
    nickname: string,
    readPagesNum: number,
    readBooksNum: number,
    achievesImg: string[],
    userBooks: TLibBook[],
}

type TAchieves = {
    image: string,
    title: string,
    description: string,
    isCompleted: boolean
}

