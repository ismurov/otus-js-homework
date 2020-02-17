import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, retry, switchMap } from 'rxjs/operators';
import { Word } from "../app.interfaces";


@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private key = 'trnsl.1.1.20141203T154628Z.0c69e9e71acbc47b.1cd6959182275e618b08f714041b9188c17cf434';
  private lang = 'ru-en';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  constructor(
    private http: HttpClient
  ) {}

  getDictItem(word: string): Observable<Word> {
    return of(word)
      .pipe(
        switchMap(item => this.http.post(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.key}&lang=${this.lang}`,
          `text=${item}`,
          this.httpOptions
        )),
        retry(3),
        map((item: {text}) => ({
          word,
          translate: item.text[0]
        }))
      );
  }
}
