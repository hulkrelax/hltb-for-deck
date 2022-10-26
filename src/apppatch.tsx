import { ServerAPI, afterPatch, wrapReactType } from 'decky-frontend-lib';
import { ReactElement } from 'react';
import { GameStats } from './components/GameStats/GameStats';
import { normalize } from './utils';

// I hate this method
export const patchAppPage = (serverApi: ServerAPI) => {
    return serverApi.routerHook.addPatch(
        '/library/app/:appid',
        (props: { path: string; children: ReactElement }) => {
            afterPatch(
                props.children.props,
                'renderFunc',
                (_: Record<string, unknown>[], ret1: ReactElement) => {
                    const game: string = normalize(
                        ret1.props.children.props.overview.display_name
                    );
                    const appId: number =
                        ret1.props.children.props.overview.appid;
                    wrapReactType(ret1.props.children);
                    afterPatch(
                        ret1.props.children.type,
                        'type',
                        (_1: Record<string, unknown>[], ret2: ReactElement) => {
                            const componentToSplice =
                                ret2.props.children?.[1]?.props.children.props
                                    .children;
                            // This always seems to be -1
                            const hltbComponentIndex =
                                componentToSplice.findIndex(
                                    (child: ReactElement) => {
                                        return (
                                            child?.props?.id === 'hltb-for-deck'
                                        );
                                    }
                                );

                            // We want to splice into the component before this point
                            const spliceIndex = componentToSplice.findIndex(
                                (child: ReactElement) => {
                                    return (
                                        child?.props?.childFocusDisabled !==
                                            undefined &&
                                        child?.props?.navRef !== undefined &&
                                        child?.props?.children?.props
                                            ?.details !== undefined &&
                                        child?.props?.children?.props
                                            ?.overview !== undefined &&
                                        child?.props?.children?.props
                                            ?.bFastRender !== undefined
                                    );
                                }
                            );

                            const component = (
                                <GameStats
                                    id="hltb-for-deck"
                                    serverApi={serverApi}
                                    game={game}
                                    appId={appId}
                                />
                            );

                            if (hltbComponentIndex < 0) {
                                if (spliceIndex > -1) {
                                    componentToSplice.splice(
                                        spliceIndex,
                                        0,
                                        component
                                    );
                                } else {
                                    console.error(
                                        'hltb-for-deck could not find where to splice!'
                                    );
                                }
                            } else {
                                componentToSplice.splice(
                                    hltbComponentIndex,
                                    1,
                                    component
                                );
                            }
                            return ret2;
                        }
                    );
                    return ret1;
                }
            );
            return props;
        }
    );
};
