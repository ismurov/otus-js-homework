import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { catchError, map, filter, concatMap, toArray } from "rxjs/operators";
import { Word } from "../app.interfaces";
import { TranslateService } from "./translate.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root"
})
export class WordsService {
  constructor(
    private storageService: StorageService,
    private translateService: TranslateService
  ) {}

  parseWords(input: string): Observable<Word[]> {
    const separator = /[,.;]+/;
    const lang = this.storageService.getLang();
    return from(input.split(separator)).pipe(
      map(item => item.trim()),
      filter(item => item.length > 0),
      concatMap(item => this.translateService.translate(lang, item)),
      toArray()
    );
  }

  getAll(): Word[] {
    return this.storageService.getDict();
  }

  getRandom(): Word {
    const words = this.getAll();
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  save(words: Word[]): void {
    this.storageService.addToDict(words);
  }
}
