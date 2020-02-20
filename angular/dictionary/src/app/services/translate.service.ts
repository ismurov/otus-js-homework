import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, retry, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Word, Language } from "../app.interfaces";


@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private key = environment.apiKey;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
  };

  constructor(
    private http: HttpClient
  ) {}

  translate(lang: Language, word: string): Observable<Word> {
    return of(word)
      .pipe(
        switchMap(item => this.http.post(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.key}&lang=${lang.value}`,
          `text=${item}`,
          this.httpOptions,
        )),
        retry(3),
        map((item: {text}) => ({
          word,
          translate: item.text[0],
        })),
      );
  }
}
