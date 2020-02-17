import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from "../../services/storage.service";
import { Language } from "../../app.interfaces";
import {
  languages,
  levels,
  defaultLanguage,
  defaultLevel
} from "../../config";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.styl']
})
export class SettingsComponent implements OnInit {

  languages: Language[] = [...languages];
  levels: number[] = [...levels];

  selectedLanguage: Language;
  selectedLevel: number;

  constructor(
    private router: Router,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.selectedLanguage = this.storage.getLang();
    this.selectedLevel = this.storage.getLevel();
  }

  onChangeLangSelect(eventValue: string) {
    console.log(this.languages.find((el, i, arr) => {console.log(el, eventValue, i, arr);return false}));
    this.selectedLanguage = this.languages.find(({value}) => value === eventValue)
  }

  onAgreeClick() {
    this.storage.setLang(this.selectedLanguage);
    this.storage.setLevel(this.selectedLevel);
  }

  onResetClick() {
    this.storage.setLang(Object.assign({}, defaultLanguage));
    this.storage.setLevel(defaultLevel);
    this.setInitialState();
  }

  onClearClick() {
    this.storage.clearDictStorage();
  }
}
