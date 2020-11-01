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

  editMode: boolean = false;

  currentLanguage: Language;
  currentLevel: number;

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
    this.getCurrentSettings();
    this.selectedLanguage = this.storage.getLang();
    this.selectedLevel = this.storage.getLevel();
  }

  getCurrentSettings() {
    this.currentLanguage = this.storage.getLang();
    this.currentLevel = this.storage.getLevel();
  }

  onChangeLangSelect(eventValue: string) {
    this.selectedLanguage = this.languages.find(({value}) => value === eventValue);
  }

  onEditClick() {
    this.editMode = true;
  }

  onApplyClick() {
    this.storage.setLang(this.selectedLanguage);
    this.storage.setLevel(this.selectedLevel);
    this.getCurrentSettings();
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
