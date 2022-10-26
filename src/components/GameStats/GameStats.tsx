import { DialogButtonPrimary, Router, ServerAPI } from 'decky-frontend-lib';
import useHltb from '../../hooks/useHltb';
import style from './style';

type GameStatsProps = {
    serverApi: ServerAPI;
    game: string;
    appId: number;
    id: string;
};

export const GameStats = ({ serverApi, game, appId, id }: GameStatsProps) => {
    const { mainStat, mainPlusStat, completeStat, allStylesStat, gameId } =
        useHltb(appId, game, serverApi);
    return (
        <div id={id}>
            {style}
            <div className="hltb-info">
                {gameId && (
                    <DialogButtonPrimary
                        className="hltb-details-btn"
                        onClick={() =>
                            Router.NavigateToExternalWeb(
                                `https://howlongtobeat.com/game/${gameId}`
                            )
                        }
                    >
                        View Details
                    </DialogButtonPrimary>
                )}
                <ul>
                    <li>
                        <p className="hltb-gametime">{mainStat} hours</p>
                        <p className="hltb-label">Main Story</p>
                    </li>
                    <li>
                        <p className="hltb-gametime">{mainPlusStat} hours</p>
                        <p className="hltb-label">Main + Extras</p>
                    </li>
                    <li>
                        <p className="hltb-gametime">{completeStat} hours</p>
                        <p className="hltb-label">Completionist</p>
                    </li>
                    <li>
                        <p className="hltb-gametime">{allStylesStat} hours</p>
                        <p className="hltb-label">All Styles</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};
