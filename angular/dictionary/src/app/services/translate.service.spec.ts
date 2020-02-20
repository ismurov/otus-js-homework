import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

import { Word, Language } from "../app.interfaces";
import { TranslateService } from './translate.service';
import { environment } from '../../environments/environment';

describe('TranslateService', () => {
  let httpTestingController: HttpTestingController;
  let service: TranslateService;

  const lang: Language = { value: 'ru-en', display: ''};
  const testData = 'кошка';
  const expectedData = {word: 'кошка', translate: 'cat'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TranslateService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(TranslateService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should http post to translate "${testData}" and return "${JSON.stringify(expectedData)}"`, () => {
    const mockResp = {
      "code": 200,
      "lang": lang.value,
      "text": [
        expectedData.translate,
        'kitten',
      ]
  };
    const key = environment.apiKey;
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&lang=${lang.value}`;

    service.translate(lang, testData).subscribe(
      (data) => expect(data).toEqual(expectedData),
      (err) => console.log(err),
    ); 

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(`text=${testData}`);
    req.flush(mockResp);
  });

});
