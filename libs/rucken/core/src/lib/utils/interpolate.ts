import { TranslateDefaultParser } from '@ngx-translate/core';

export function interpolate(value: string, words?: any) {
    const newArgs: any = {};
    for (const key in words) {
        if (words[key]) {
            if (typeof words[key] === 'string') {
                newArgs[key] = words[key];
            } else {
                if (typeof words[key] === 'number') {
                    newArgs[key] = words[key].toString();
                }
            }
        }
    }
    try {
        const translateDefaultParser = new TranslateDefaultParser();
        value = translateDefaultParser.interpolate(value, newArgs);
    } catch (error) { }
    return value;
}
