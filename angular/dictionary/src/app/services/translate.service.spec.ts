import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TranslateService } from './translate.service';

describe('TranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
  }));

  it('should be created', () => {
    const service: TranslateService = TestBed.get(TranslateService);
    expect(service).toBeTruthy();
  });
});
