import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Word, Language } from "../app.interfaces";

import { languages, levels, defaultLanguage, defaultLevel } from "../config";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private localStorage = window.localStorage;

  private langKey = "lang";
  private levelKey = "level";

  private lang: Language = null;
  private level: number = null;

  constructor() {}

  getDict(): Word[] {
    const lang = this.getLang();
    try {
      const arr = JSON.parse(this.localStorage.getItem(lang.value));
      return arr instanceof Array ? arr : [];
    } catch (e) {
      console.log(e);
    }
    return [];
  }

  addToDict(items: Word[]): void {
    const dict = this.getDict();
    from(items)
      .pipe(
        filter(item => !dict.find(({ word }) => word === item.word)),
        map(item => dict.unshift(item))
      )
      .subscribe({
        complete: () => {
          this.localStorage.setItem(this.lang.value, JSON.stringify(dict));
        }
      });
  }

  clearDict(): void {
    this.localStorage.removeItem(this.lang.value);
  }

  getLang(): Language {
    if (this.lang) {
      return { ...this.lang };
    }
    const savedLangValue = this.localStorage.getItem(this.langKey);
    const savedLang = languages.find(
      el => el.value && el.value === savedLangValue
    );
    this.lang = savedLang ? { ...savedLang } : { ...defaultLanguage };
    return { ...this.lang };
  }

  setLang(lang: Language): void {
    this.lang = { ...lang };
    this.localStorage.setItem(this.langKey, lang.value);
  }

  resetLang(): void {
    this.lang = null;
    this.localStorage.removeItem(this.langKey);
  }

  getLevel(): number {
    if (this.level) {
      return this.level;
    }
    const savedLevel = +this.localStorage.getItem(this.levelKey);
    this.level = levels.includes(savedLevel) ? savedLevel : defaultLevel;
    return this.level;
  }

  setLevel(level: number): void {
    this.level = level;
    this.localStorage.setItem(this.levelKey, level.toString());
  }

  resetLevel(): void {
    this.level = null;
    this.localStorage.removeItem(this.levelKey);
  }
}
