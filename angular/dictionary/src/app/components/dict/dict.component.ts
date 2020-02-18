import { Component, OnInit } from '@angular/core';
import { Word } from "../../app.interfaces";
import { StorageService } from "../../services/storage.service";
import { TranslateService } from "../../services/translate.service";

@Component({
  selector: 'app-dict',
  templateUrl: './dict.component.html',
  styleUrls: ['./dict.component.styl']
})
export class DictComponent implements OnInit {

  dict: Word[];

  constructor(
    private storageService: StorageService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.dict = this.storageService.getDict();
  }

}
