import { useEffect, useState } from 'react';
import { getCache, styleKey } from './Cache';

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
            setStyle(await getCache<HLTBStyle>(styleKey));
        };
        getData();
    }, [style]);

    return style;
};
