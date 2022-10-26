export type SearchResults = {
    category: string;
    color: string;
    count: number;
    data: GameStatsData[];
    pageCurrent: number;
    pageSize: number;
    pageTotal: number;
    title: string;
};

export type HLTBStats = {
    mainStat: string;
    mainPlusStat: string;
    completeStat: string;
    allStylesStat: string;
    lastUpdatedAt: Date;
    gameId?: number;
};

export type GameStatsData = {
    count: number;
    game_id: number;
    game_name: string;
    game_name_date: number;
    game_alias: string;
    game_type: string;
    game_image: string;
    comp_lvl_combine: number;
    comp_lvl_sp: number;
    comp_lvl_co: number;
    comp_lvl_mp: number;
    comp_lvl_spd: number;
    comp_main: number;
    comp_plus: number;
    comp_100: number;
    comp_all: number;
    comp_main_count: number;
    comp_plus_count: number;
    comp_100_count: number;
    comp_all_count: number;
    invested_co: number;
    invested_mp: number;
    invested_co_count: number;
    invested_mp_count: number;
    count_comp: number;
    count_speedrun: number;
    count_backlog: number;
    count_review: number;
    review_score: number;
    count_playing: number;
    count_retired: number;
    profile_dev: string;
    profile_popular: number;
    profile_steam: number;
    profile_platform: string;
    release_world: number;
};
