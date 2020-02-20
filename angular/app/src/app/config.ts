import { Language } from "./app.interfaces";


export const languages: Language[] = [
    { value: 'en-ru', display: 'English / Russian'},
    { value: 'ru-en', display: 'Russian / English'},

    { value: 'ru-it', display: 'Russian / Italian'},
    { value: 'it-ru', display: 'Italian / Russian '},
];

export const levels: number[] = [
    5,
    10,
    20,
    50,
    100,
];

export const defaultLanguage: Language = languages[0];
export const defaultLevel: number = levels[0];
