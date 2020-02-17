import { Language } from "./app.interfaces";


export const languages: Language[] = [
    { value: 'ru-en', display: 'English / Russian'},
    { value: 'en-ru', display: 'Russian / English'},

    // { value: 'ru-de', display: 'Russian / Deutsch'},
    // { value: 'de-ru', display: 'Deutsch / English'},

    // { value: 'ru-it', display: 'Russian / Italian'},
    // { value: 'it-ru', display: 'Italian / English'},

    // { value: 'ru-fr', display: 'Russian / French'},
    // { value: 'fr-ru', display: 'French / English'},
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
