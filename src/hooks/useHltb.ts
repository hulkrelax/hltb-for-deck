import { ServerAPI, ServerResponse } from 'decky-frontend-lib';
import { get } from 'fast-levenshtein';
import { useState, useEffect } from 'react';
import { normalize } from '../utils';
import { GameStatsData, HLTBStats, SearchResults } from './GameInfoData';
import { getCache, updateCache } from './Cache';

type HLTBResult = { body: string; status: number };

// update cache after 2 hours
const needCacheUpdate = (lastUpdatedAt: Date) => {
    const now = new Date();
    const durationMs = Math.abs(lastUpdatedAt.getTime() - now.getTime());

    const hoursBetweenDates = durationMs / (60 * 60 * 1000);
    return hoursBetweenDates > 2;
};

// Hook to get data from HLTB
const useHltb = (appId: number, game: string, serverApi: ServerAPI) => {
    const [stats, setStats] = useState<HLTBStats>({
        mainStat: '--',
        mainPlusStat: '--',
        completeStat: '--',
        allStylesStat: '--',
        gameId: undefined,
        lastUpdatedAt: new Date(),
    });
    const data = {
        searchType: 'games',
        searchTerms: game.split(' '),
        searchPage: 1,
        size: 50,
        searchOptions: {
            games: {
                userId: 0,
                platform: '',
                sortCategory: 'name',
                rangeCategory: 'main',
                rangeTime: { min: 0, max: 0 },
                gameplay: { perspective: '', flow: '', genre: '' },
                modifier: 'hide_dlc',
            },
            users: {},
            filter: '',
            sort: 0,
            randomizer: 0,
        },
    };
    useEffect(() => {
        const getData = async () => {
            const cache = await getCache<HLTBStats>(`${appId}`);
            if (cache && !needCacheUpdate(cache.lastUpdatedAt)) {
                setStats(cache);
            } else {
                console.log(`get HLTB data for ${appId} and ${game}`);
                const res: ServerResponse<HLTBResult> =
                    await serverApi.fetchNoCors<HLTBResult>(
                        'https://howlongtobeat.com/api/search',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Origin: 'https://howlongtobeat.com',
                                Referer: 'https://howlongtobeat.com/',
                                Authority: 'howlongtobeat.com',
                                'User-Agent':
                                    'Chrome: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
                            },
                            //@ts-ignore
                            json: data,
                        }
                    );
                const result = res.result as HLTBResult;
                if (result.status === 200) {
                    const results: SearchResults = JSON.parse(result.body);
                    results.data.forEach((game) => {
                        game.game_name = normalize(game.game_name);
                    });
                    // Search by appId first
                    let gameStats: GameStatsData | undefined =
                        results.data.find(
                            (elem) => elem.profile_steam === appId
                        );
                    // Search by game name if not found by appId
                    if (gameStats === undefined)
                        gameStats = results.data.find(
                            (elem) => elem.game_name === game
                        );
                    // Couldn't find anything, find a close match
                    if (gameStats === undefined && results.data.length > 0) {
                        const possibleChoice = results.data
                            .map((gameStat) => {
                                return {
                                    minEditDistance: get(
                                        game,
                                        gameStat.game_name,
                                        { useCollator: true }
                                    ),
                                    gameStat,
                                };
                            })
                            .sort(
                                (a, b) => a.minEditDistance - b.minEditDistance
                            )[0];
                        gameStats = possibleChoice.gameStat;
                    }
                    let newStats = stats;
                    if (gameStats) {
                        newStats = {
                            mainStat:
                                gameStats.comp_main > 0
                                    ? (gameStats.comp_main / 60 / 60).toFixed(1)
                                    : '--',
                            mainPlusStat:
                                gameStats.comp_plus > 0
                                    ? (gameStats.comp_plus / 60 / 60).toFixed(1)
                                    : '--',
                            completeStat:
                                gameStats.comp_100 > 0
                                    ? (gameStats.comp_100 / 60 / 60).toFixed(1)
                                    : '--',
                            allStylesStat:
                                gameStats.comp_all > 0
                                    ? (gameStats.comp_all / 60 / 60).toFixed(1)
                                    : '--',
                            gameId: gameStats.game_id,
                            lastUpdatedAt: new Date(),
                        };
                    }
                    setStats(newStats);
                    updateCache(`${appId}`, newStats);
                } else {
                    console.error(result);
                }
            }
        };
        if (appId) {
            getData();
        }
    }, [appId]);

    return {
        ...stats,
    };
};

export default useHltb;
