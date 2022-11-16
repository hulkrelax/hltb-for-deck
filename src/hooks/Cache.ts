import localforage from 'localforage';
import { HLTBStyle } from './useStyle';

const database = 'hltb-for-deck';
export const styleKey = 'hltb-style';

localforage.config({
    name: database,
});

export async function updateCache<T>(key: string, value: T) {
    await localforage.setItem(key, value);
}

export async function getCache<T>(key: string): Promise<T | null> {
    return await localforage.getItem<T>(key);
}

export const clearCache = () => {
    const style = getCache<HLTBStyle>(styleKey);
    localforage.clear();
    updateCache(styleKey, style);
};
