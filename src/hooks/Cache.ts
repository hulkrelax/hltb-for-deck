import localforage from 'localforage';
import { HLTBStyle } from './useStyle';

const database = 'hltb-for-deck';
export const styleKey = 'hltb-style';
export const hideDetailsKey = 'hltb-hide-details';

localforage.config({
    name: database,
});

export async function updateCache<T>(key: string, value: T) {
    await localforage.setItem(key, value);
}

export async function getCache<T>(key: string): Promise<T | null> {
    return await localforage.getItem<T>(key);
}

export async function getStyle(): Promise<HLTBStyle> {
    const hltbStyle = await localforage.getItem<HLTBStyle>(styleKey);
    return hltbStyle === null ? 'default' : hltbStyle;
}

export async function getPreference(): Promise<boolean> {
    const hideViewDetails = await localforage.getItem<boolean>(hideDetailsKey);
    return hideViewDetails === null ? false : hideViewDetails;
}

export const clearCache = () => {
    const style = getStyle();
    localforage.clear();
    updateCache(styleKey, style);
};
