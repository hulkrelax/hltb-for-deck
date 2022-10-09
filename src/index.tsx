import {
    ButtonItem,
    definePlugin,
    Menu,
    MenuItem,
    PanelSection,
    PanelSectionRow,
    ServerAPI,
    showContextMenu,
    staticClasses,
} from 'decky-frontend-lib';
import React from 'react';
import { VFC } from 'react';
import { FaShip } from 'react-icons/fa';


const Content: VFC<{ serverAPI: ServerAPI }> = ({}) => {
    return (
        <PanelSection title="Panel Section">
            <PanelSectionRow>
                <ButtonItem
                    layout="below"
                    onClick={(e) =>
                        showContextMenu(
                            <Menu
                                label="Menu"
                                cancelText="CAAAANCEL"
                                onCancel={() => {}}
                            >
                                <MenuItem onSelected={() => {}}>
                                    Item #1
                                </MenuItem>
                                <MenuItem onSelected={() => {}}>
                                    Item #2
                                </MenuItem>
                                <MenuItem onSelected={() => {}}>
                                    Item #3
                                </MenuItem>
                            </Menu>,
                            e.currentTarget ?? window
                        )
                    }
                >
                    Server says yolo
                </ButtonItem>
            </PanelSectionRow>
        </PanelSection>
    );
};

export default definePlugin((serverApi: ServerAPI) => {

    return {
        title: <div className={staticClasses.Title}>Example Plugin</div>,
        content: <Content serverAPI={serverApi} />,
        icon: <FaShip />,
    };
});
