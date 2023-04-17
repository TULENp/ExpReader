import { ImageSourcePropType } from "react-native/types";

export {
    TBook,
    TLibBook,
    TShopBook,
    LibStackParams,
    ProfileStackParams,
    ShopStackParams,
    TRarity,
    TUserData,
    TAchieves,
    TDailyTask,
    TPin,
    AuthStackParams,
    TAchieveStatus,
    TBookStats,
};

type TShopBook = {
    id: string,
    title: string,
    authors: string[],
    cover: string,
    price?: number,
}

type TLibBook = {
    id: string,
    title: string,
    authors: string[],
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
    authors: string[],
    cover: string,
    price: number,
    bookPages: number,
    genres: string[],
    description: string,
    fragment: string,
    isFavorite: boolean,
}

type AuthStackParams = {
    SignIn: undefined;
    Register: undefined;
};

type LibStackParams = {
    Library: undefined;
    Reader: { book: TLibBook };
};

type ProfileStackParams = {
    Profile: undefined;
    DailyTask: { todayPages: number };
    Achievements: undefined;
};

type ShopStackParams = {
    Shop: undefined,
    ShopBook: { id: string },
    Favorites: undefined,
    Checkout: { book: TBook },
    FragmentReader: { fragment: string },
};

type TRarity = { rarity: 'обычная' | 'редкая' | 'эпическая' | 'легендарная', color: string } ;



type TUserData = {
    nickname: string,
    readPagesNum: number,
    readBooksNum: number,
    achievesImg: string[],
    userBooks: TLibBook[],
}

type TBookStats = {
    bookID: string,
    readPages: number,
    currentPage: number,
    isRead: boolean,
    readDate: Date
}

type TAchieves = {
    image: string,
    title: string,
    description: string,
    isCompleted: boolean
}

type TAchieveStatus = { id: string, isCompleted: boolean };
// type TDailyTask = {
//     level: TDailyTaskLevel,
//     value: TDailyTaskValue,
//     isCompleted: boolean,
//     todayPages: number,
// }

// type TDailyTaskLevel = 'Легкий' | 'Нормальный' | 'Серьезный';

type TDailyTask = 60 | 120 | 240;

type TPin = {
    id: number,
    condition: number,
    title: string,
    description: string,
    img: ImageSourcePropType,
}
