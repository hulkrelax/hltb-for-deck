import { DialogButtonPrimary, Router, ServerAPI } from 'decky-frontend-lib';
import useHltb from '../../hooks/useHltb';
import { useStyle } from '../../hooks/useStyle';
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
    const hltbStyle = useStyle();
    const baseClass = hltbStyle === null ? 'hltb-info-absolute' : 'hltb-info';
    let hltbInfoStyle = '';
    switch (hltbStyle) {
        case 'clean':
        case 'clean-left':
            hltbInfoStyle = 'hltb-info-clean';
            break;
        case 'clean-default':
            hltbInfoStyle = 'hltb-info-clean-default';
            break;
    }
    const hltbInfoPosition =
        hltbStyle === 'clean-left' ? 'hltb-info-clean-left' : '';
    const btnStyle =
        hltbStyle === 'default' || hltbStyle === 'clean-default'
            ? ''
            : 'hltb-details-btn-clean';

    return (
        <div id={id}>
            {style}
            <div
                className={`${baseClass} ${hltbInfoStyle} ${hltbInfoPosition}`}
            >
                {gameId && (
                    <DialogButtonPrimary
                        className={`hltb-details-btn ${btnStyle}`}
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
