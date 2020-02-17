import { Injectable } from '@angular/core';
import {from, Observable, of, pipe} from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { Word } from "../app.interfaces";
import { TranslateService } from './translate.service';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(
    private translateService: TranslateService
  ) { }

  getDictItemsFromInput(input: string): Observable<Word> {
    return from(input.split('.'))
      .pipe(
        map(item => item.trim()),
        filter(item => item.length > 0),
        concatMap(item => this.translateService.getDictItem(item))
      );
  }
}
