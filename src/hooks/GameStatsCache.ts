import localforage from 'localforage';
import { HLTBStats } from './GameInfoData';

const database = 'hltb-for-deck';

localforage.config({
    name: database,
});

export const updateCache = async (appId: string, newData: HLTBStats) => {
    await localforage.setItem(appId, newData);
};

export const clearCache = () => {
    localforage.clear();
};

export const getCache = async (appId: string): Promise<HLTBStats | null> => {
    return await localforage.getItem<HLTBStats>(appId);
};
