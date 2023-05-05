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
    AuthStackParams,
    TAchieveStatus,
    TBookStats,
    TDailyTaskLevel,
    TabParams,
    AdminStackParams
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
    isBought: boolean
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

type AdminStackParams = {
    Main: undefined,
    AllBooks: undefined,
    Book: { id: string },
    AddBook: undefined,
    Genres: undefined,
    Authors: undefined,
    Fragment: { fragment: string },

    Achieves: undefined,
    Rarity: undefined,
    DailyTask: undefined,
    AddAchieve: undefined,
};

type TabParams = {
    ShopTab: undefined,
    LibraryTab: undefined,
    ProfileTab: undefined,
};

type TUserData = {
    nickname: string,
    readPagesNum: number,
    readBooksNum: number,
    achievements: boolean[],
    userBooks: TLibBook[],
}

type TBookStats = {
    bookID: string,
    readPages: number,
    currentPage: number,
    isRead: boolean,
    readDate: Date
}

type TAchieveStatus = {
    id: string,
    isCompleted: boolean
};

type TRarity = {
    rarity: 'обычная' | 'редкая' | 'эпическая' | 'легендарная',
    color: string
};

type TDailyTask = 60 | 120 | 240;

type TDailyTaskLevel = {
    level: 'Легкий' | 'Средний' | 'Серьезный',
    color: string
};

type TAchieves = {
    id: number,
    condition: number,
    title: string,
    description: string,
    img: ImageSourcePropType,
}
