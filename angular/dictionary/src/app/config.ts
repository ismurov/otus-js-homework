import { Language } from "./app.interfaces";


export const languages: Language[] = [
    { value: 'ru-en', display: 'English'},
    { value: 'en-ru', display: 'Russian'},

    {display: 'Английский', value: 'ru-en'},
    {display: 'Немецкий', value: 'ru-de'},
    {display: 'Французкий', value: 'ru-fr'},
    {display: 'Итальянский', value: 'ru-it'},
    {display: 'Испанский', value: 'ru-es'},
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
