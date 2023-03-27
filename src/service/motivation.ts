import { realBookPageChars, pageChars } from "../constants";
import { TRarity } from "../types";

function calculateRarity(pages: number): TRarity {
    let rarity: TRarity = 'legendary'
    // conversion from app pages to "real" pages, which depends on pageChars
    const realPages = pages / (realBookPageChars / pageChars);

    if (realPages <= 300 * pageChars) {
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