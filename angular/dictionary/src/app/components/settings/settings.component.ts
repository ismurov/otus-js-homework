import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../services/storage.service";
import { Language } from "../../app.interfaces";
import {
  languages,
  levels,
} from "../../config";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.styl']
})
export class SettingsComponent implements OnInit {

  selectedLanguage: Language;
  selectedLevel: number;

  languages: Language[] = [...languages];
  levels: number[] = [...levels];

  constructor(
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
    this.selectedLanguage = this.languages.find(({value}) => value === eventValue);
  }

  onAgreeClick() {
    this.storage.setLang(this.selectedLanguage);
    this.storage.setLevel(this.selectedLevel);
  }

  onResetClick() {
    this.storage.resetLang();
    this.storage.resetLevel();
    this.setInitialState();
  }

  onClearClick() {
    this.storage.clearDict();
  }
}
