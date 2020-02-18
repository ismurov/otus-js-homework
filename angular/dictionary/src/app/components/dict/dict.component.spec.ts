import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatFormFieldModule,
  MatListModule,
  MatExpansionModule,
  MatInputModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DictComponent } from './dict.component';

describe('DictComponent', () => {
  let component: DictComponent;
  let fixture: ComponentFixture<DictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictComponent ],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatListModule,
        MatExpansionModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
