import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { filter, map, reduce } from 'rxjs/operators';
import { Word, Language } from "../app.interfaces";

import {
  languages,
  levels,
  defaultLanguage,
  defaultLevel
} from "../config";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorage = window.localStorage;

  // private langKey = 'lang';
  // private levelKey = 'level';

  private lang: Language = {...defaultLanguage};
  private level: number = defaultLevel;

  constructor() { }

  getDict(): Array<Word> {
    try {
      const arr = JSON.parse(this.localStorage.getItem(this.lang.value));
      return arr instanceof Array ? arr : [];
    } catch (e) {
      console.log(e);
    }
    return [];
  }

  addToDict(items: Array<Word>) {
    console.log('Add to dict:', items);
    const dict = this.getDict();
    from(items)
      .pipe(
        filter(item => !dict.find(({word}) => word === item.word)),
        map(item => dict.unshift(item))
      ).subscribe({
        complete: () => {
          this.localStorage.setItem(this.lang.value, JSON.stringify(dict));
        }
    });
  }

  clearDict() {
    this.localStorage.removeItem(this.lang.value);
  }

  setLang(lang: Language) {
    console.log('Set Language:', lang);
    this.lang = {...lang};
  }

  getLang() {
    return {...this.lang};
  }

  resetLang() {
    this.lang = {...defaultLanguage};
  }

  setLevel(level: number) {
    console.log('Set Level:', level);
    this.level = level
  }

  getLevel() {
    return this.level
  }

  resetLevel() {
    this.level = defaultLevel;
  }
}
