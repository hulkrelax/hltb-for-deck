import { definePlugin, ServerAPI, staticClasses } from 'decky-frontend-lib';
import { FaGamepad } from 'react-icons/fa';
import { patchAppPage } from './apppatch';
import { QuickAccessView } from './components/QuickAccessView/QuickAccessView';

export default definePlugin((serverAPI: ServerAPI) => {
    const appPagePatch = patchAppPage(serverAPI);
    return {
        title: <div className={staticClasses.Title}>HLTB for Deck</div>,
        icon: <FaGamepad />,
        content: <QuickAccessView />,
        onDismount() {
            serverAPI.routerHook.removePatch(
                '/library/app/:appid',
                appPagePatch
            );
        },
    };
});
