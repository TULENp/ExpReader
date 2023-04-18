import { ImageSourcePropType } from "react-native";
import { achievements } from "../TestData/achievements";
import { srcIcnBronze, srcIcnGold, srcIcnSilver } from "../constants/images";
import { TDailyTask, TDailyTaskLevel, TRarity, TUserData } from "../types";
import { incUserReadPagesAS } from "./asyncStorage";
import { greenRarity, blueRarity, redRarity, yellowRarity } from "../constants/colors";

export function calculateRarity(pages: number): TRarity {
    let rarity: TRarity = { rarity: 'легендарная', color: yellowRarity };

    if (pages <= 900) {
        rarity = { rarity: 'обычная', color: greenRarity }
    }
    else if (pages > 900 && pages <= 1800) {
        rarity = { rarity: 'редкая', color: blueRarity }
    }
    else if (pages > 1800 && pages <= 2700) {
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
        // alert(`Поздравляю, вы прочли 1/3 книги. + ${readReward} очка чтения`);
    }
    else if (readPages === silver) {
        readReward = Math.ceil(bookPages * 0.2);
        // alert(`Поздравляю, вы прочли 2/3 книги. + ${readReward} очка чтения`);
    }
    else if (readPages === bookPages) { //read the whole book
        readReward = Math.ceil(bookPages * 0.3);
        // alert(`Поздравляю, вы прочли книгу. + ${readReward} очка чтения`);
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

export function checkAchievesCompletion(readPages: number, userData: TUserData) {
    let achieves: boolean[] = userData.achievements;
    //Check read pages achieves
    for (let i: number = 0; i < 3; i++) {
        if (!achieves[i] && readPages >= achievements[i].condition) {
            achieves[i] = true;
        }
    }
    //Check read book achieves
    for (let i: number = 3; i < 6; i++) {
        if (!achieves[i] && userData.readBooksNum >= achievements[i].condition) {
            achieves[i] = true;
        }
    }
    return JSON.stringify(achieves);
}
