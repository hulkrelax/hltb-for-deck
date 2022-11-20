export const normalize = (str: string) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9 \x7f-\xff]/gi, ' ')
        .replace(/\s+/gi, ' ')
        .trim();
};
