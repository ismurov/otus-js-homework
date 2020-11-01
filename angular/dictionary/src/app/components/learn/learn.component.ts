import { Component, OnInit } from '@angular/core';
import { Word } from "../../app.interfaces";
import { StorageService } from "../../services/storage.service";
import { WordsService } from "../../services/words.service";

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.styl']
})
export class LearnComponent implements OnInit {

  turn: number;
  result: number;
  level: number;
  message: string;
  placeholder: string;
  userInput: string;
  disableInput: boolean;
  currentWord: Word;
  
  constructor(
    private storage: StorageService,
    private wordsService: WordsService,
  ) { }

  ngOnInit() {
    this.newGame();
  }

  onNext() {
    this.turn++;

    if (this.userInput === this.currentWord.translate) {
      this.result++
    }

    if (this.turn === this.level) {
      this.message = `Your result is ${this.result} out of ${this.level}`;
      this.placeholder = '';
      this.userInput = '';
      this.disableInput = true;
      return;
    }

    if (this.turn > this.level) {
      this.newGame();
    }

    this.userInput = '';
    this.currentWord = this.wordsService.getRandom();
    this.message = this.currentWord ? this.currentWord.word : '';
  }

  newGame() {
    this.turn = 0;
    this.result = 0;
    this.placeholder = 'Your translation';
    this.level = this.storage.getLevel();
    this.currentWord = this.wordsService.getRandom();;
    this.message = this.currentWord ? this.currentWord.word : '';
    this.disableInput = false;
  }

}
