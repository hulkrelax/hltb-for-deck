import { useEffect, useState } from 'react';
import { getStyle } from './Cache';

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
