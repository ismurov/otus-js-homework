import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { Word, Language } from "../app.interfaces";

describe('StorageService', () => {
  const localStorage = window.localStorage;
  const key = 'en-fr';
  const testLang: Language = { value: key, display: 'test lang'};
  const testData: Array<Word> = [
    {word: 'car', translate: 'voiture'},
    {word: 'weapon', translate: 'arme'},
  ];

  let service: StorageService;
  let storedData: string;

  beforeAll(() => {
    storedData = localStorage.getItem(key);
  });

  afterAll(() => {
    localStorage.setItem(key, storedData);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(StorageService);
    localStorage.removeItem(key);
  });

  afterEach(() => {
    localStorage.removeItem(key);
  });

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  it ('should return an empty array if dict does not exist', () => {
    service.setLang(testLang);
    const data = service.getDict();
    expect(data).toEqual([]);
  });

  it(`should add "${JSON.stringify(testData)}" to localStorage in reverse order`, () => {
    service.setLang(testLang);
    service.addToDict(testData);
    const data = localStorage.getItem(key);
    expect(data).toEqual(JSON.stringify(testData.reverse()));
  });

  it(`should get "${JSON.stringify(testData)}" from localStorage`, () => {
    localStorage.setItem(key, JSON.stringify(testData));
    service.setLang(testLang);
    const data = service.getDict();
    expect(data).toEqual(testData);
  });
});
