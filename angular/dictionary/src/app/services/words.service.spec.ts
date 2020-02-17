import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { WordsService } from './words.service';

describe('WordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
  }));

  it('should be created', () => {
    const service: WordsService = TestBed.get(WordsService);
    expect(service).toBeTruthy();
  });
});
