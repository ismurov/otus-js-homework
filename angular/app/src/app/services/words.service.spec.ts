import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { Observable, of } from 'rxjs';

import { Word, Language } from "../app.interfaces";
import { WordsService } from "./words.service";
import { TranslateService } from "./translate.service";
import { StorageService } from "./storage.service";

describe("WordsService", () => {
  const testLang: Language = { value: "ru-en", display: "" };
  const testWord1: Word = { word: "кошка", translate: "cat" };
  const testWord2: Word = { word: "собака", translate: "dog" };
  let testDict: Word[];

  const translateServiceStub = {
    translate(lang: Language, word: string): Observable<Word> {
      return of(testWord1);
    },
  };

  const storageServiceStub = {
    getLang(): Language {
      return testLang;
    },
    getDict(): Word[] {
      return testDict;
    },
    addToDict(words: Word[]) {
      testDict = words
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WordsService,
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: StorageService, useValue: storageServiceStub }
      ],
      imports: [HttpClientModule]
    });
    testDict = null;
  });

  afterEach(() => {
    testDict = null;
  })

  it("should be created", () => {
    const service: WordsService = TestBed.get(WordsService);
    expect(service).toBeTruthy();
  });

  it("should return words from storage service", () => {
    const service: WordsService = TestBed.get(WordsService);
    testDict = [testWord1,testWord2];
    const words = service.getAll()
    expect(words).toEqual([testWord1, testWord2]);
  });

  it("should return random word from storage service", () => {
    const service: WordsService = TestBed.get(WordsService);
    testDict = [testWord2]
    const word = service.getRandom();
    expect(word).toEqual(testWord2);
  });

  it("should separate and return translated words (3 words)", () => {
    const service: WordsService = TestBed.get(WordsService);
    service.parseWords('  кошка, , , собака. 223 ')
      .subscribe(words => {
        expect(words).toEqual([testWord1, testWord1, testWord1]);
      });
  });
});
