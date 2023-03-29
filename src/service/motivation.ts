import { realBookPageChars, pageChars } from "../constants";
import { TBookmark, TDailyTask, TRarity } from "../types";

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
            bookmark = 'bronze'
        }
        else if (readPercent >= 60 && readPercent < 100) {
            bookmark = 'silver'
        }
        else if (readPercent == 100) {
            bookmark = 'gold'
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