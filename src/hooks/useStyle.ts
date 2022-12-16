import { useEffect, useState } from 'react';
import { getPreference, getStyle } from './Cache';

export type HLTBStyle =
    | 'default'
    | 'clean'
    | 'clean-left'
    | 'clean-default'
    | null;

export const useStyle = () => {
    const [style, setStyle] = useState<HLTBStyle>(null);
    useEffect(() => {
        const getData = async () => {
            setStyle(await getStyle());
        };
        getData();
    }, []);

    return style;
};

export const usePreference = () => {
    const [pref, setPref] = useState<boolean>(false);
    useEffect(() => {
        const getData = async () => {
            setPref(await getPreference());
        };
        getData();
    }, []);

    return pref;
};
