import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatTabsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DictComponent } from './components/dict/dict.component';
import { LearnComponent } from './components/learn/learn.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    DictComponent,
    LearnComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatSliderModule,

  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatInputModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
