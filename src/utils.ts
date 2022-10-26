export const normalize = (str: string) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9 ]/gi, ' ')
        .replace(/\s+/gi, ' ')
        .trim();
};
