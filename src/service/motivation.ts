import { pins } from "../TestData/pins";
import { realBookPageChars, pageChars } from "../constants";
import { TBookmark, TDailyTask, TRarity } from "../types";
import { getAchievesStatusAS, setAchievesStatusAS } from "./asyncStorage";
import { getUserPagesAS, incUserReadPagesAS } from "./asyncStorage";

export function calculateRarity(pages: number): TRarity {
    let rarity: TRarity = 'legendary'
    // conversion from app pages to "real" pages, which depends on pageChars
    const realPages = Math.ceil(pages / (realBookPageChars / pageChars));

    if (realPages <= 300) {
        rarity = 'common'
    }
    else if (realPages > 300 && realPages <= 600) {
        rarity = 'rare'
    }
    else if (realPages > 600 && realPages <= 900) {
        rarity = 'epic'
    }
    return rarity;
}

export function calculateBookmark(readPages: number, bookPages: number): TBookmark {
    let bookmark: TBookmark = 'bookmark_empty';
    if (bookPages !== 0) {
        const readPercent = Math.floor((readPages / bookPages) * 100);

        if (readPercent >= 30 && readPercent < 60) {
            bookmark = 'bronze';
        }
        else if (readPercent >= 60 && readPercent < 100) {
            bookmark = 'silver';
        }
        else if (readPercent == 100) {
            bookmark = 'gold';
        }
    }
    return bookmark;
}

export function getDailyTaskLevel(dailyTaskPages: TDailyTask) {
    let level = '';
    if (dailyTaskPages === 60) {
        level = 'Легкий';
    } else if (dailyTaskPages === 120) {
        level = 'Нормальный';
    } else if (dailyTaskPages === 240) {
        level = 'Серьезный';
    }
    return level;
}

export function checkBookmarkReward(readPages: number, bookPages: number) {
    let readReward: number = 0;
    const bronze = Math.floor(bookPages / 3); //read 1/3 of the book
    const silver = Math.floor(2 * bookPages / 3); //read 2/3 of the book

    if (readPages === bronze) {
        readReward = Math.ceil(bookPages * 0.1);
        alert(`Поздравляю, вы прочли 1/3 книги. + ${readReward} очка чтения`);
    }
    else if (readPages === silver) {
        readReward = Math.ceil(bookPages * 0.2);
        alert(`Поздравляю, вы прочли 2/3 книги. + ${readReward} очка чтения`);
    }
    else if (readPages === bookPages) { //read the whole book
        readReward = Math.ceil(bookPages * 0.3);
        alert(`Поздравляю, вы прочли книгу. + ${readReward} очка чтения`);
    }

    if (readReward !== 0) {
        incUserReadPagesAS(readReward);
    }
}

export async function checkPagesAchieves(readPages: number) {
    let achieves: boolean[] = await getAchievesStatusAS();
    let count = 0;
    //Check pages achieves
    for (let i: number = 0; i < 3; i++) {
        if (!achieves[i] && readPages >= pins[i].condition) {
            achieves[i] = true;
            count++;
        }
    }
    if (count > 0) {
        setAchievesStatusAS(achieves);
        //TODO update backend
    }
}

export async function checkBooksAchieves(readBooks: number) {
    let achieves: boolean[] = await getAchievesStatusAS();
    let count = 0;
    //Check books achieves
    for (let i: number = 3; i < 6; i++) {
        if (!achieves[i] && readBooks >= pins[i].condition) {
            achieves[i] = true;
            count++;
        }
    }
    if (count > 0) {
        setAchievesStatusAS(achieves);
        //TODO update backend
    }
}