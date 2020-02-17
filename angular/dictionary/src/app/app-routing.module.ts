import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictComponent } from './components/dict/dict.component';
import { LearnComponent } from './components/learn/learn.component';
import { SettingsComponent } from './components/settings/settings.component';


const routes: Routes = [
  { path: '', redirectTo: '/dict', pathMatch: 'full' },
  { path: 'dict', component: DictComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
