import { ImageSourcePropType } from "react-native";
import { pins } from "../TestData/pins";
import { realBookPageChars, pageChars } from "../constants";
import { srcIcnBronze, srcIcnGold, srcIcnSilver } from "../constants/images";
import { TDailyTask, TDailyTaskLevel, TRarity } from "../types";
import { getAchievesStatusAS, setAchievesStatusAS } from "./asyncStorage";
import { getUserPagesAS, incUserReadPagesAS } from "./asyncStorage";
import { greenRarity, blueRarity, redRarity, yellowRarity } from "../constants/colors";

export function calculateRarity(pages: number, isPagesReal: boolean = false): TRarity {
    let rarity: TRarity = { rarity: 'легендарная', color: yellowRarity };
    // if pages not 'real' convert from app pages to "real" pages, which depends on pageChars
    let realPages = isPagesReal ? pages : Math.ceil(pages / (realBookPageChars / pageChars));

    if (realPages <= 300) {
        rarity = { rarity: 'обычная', color: greenRarity }
    }
    else if (realPages > 300 && realPages <= 600) {
        rarity = { rarity: 'редкая', color: blueRarity }
    }
    else if (realPages > 600 && realPages <= 900) {
        rarity = { rarity: 'эпическая', color: redRarity }
    }
    return rarity;
}

export function calculateBookmark(readPages: number, bookPages: number): ImageSourcePropType | null {
    let bookmark: ImageSourcePropType | null = null;
    const bronze = Math.floor(bookPages / 3); //read 1/3 of the book
    const silver = Math.floor(2 * bookPages / 3); //read 2/3 of the book
    if (bookPages !== 0) {
        if (readPages >= bronze && readPages < silver) {
            bookmark = srcIcnBronze;
        }
        else if (readPages >= silver && readPages < bookPages) {
            bookmark = srcIcnSilver;
        }
        else if (readPages === bookPages) { //read the whole book
            bookmark = srcIcnGold;
        }
    }
    return bookmark;
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

export function getDailyTaskLevel(dailyTaskPages: TDailyTask): TDailyTaskLevel {
    let level: TDailyTaskLevel = { level: 'Легкий', color: greenRarity };
    if (dailyTaskPages === 60) {
        level = { level: 'Легкий', color: greenRarity };
    }
    else if (dailyTaskPages === 120) {
        level = { level: 'Средний', color: blueRarity };
    }
    else if (dailyTaskPages === 240) {
        level = { level: 'Серьезный', color: redRarity };
    }
    return level;
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