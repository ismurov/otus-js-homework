import { Component, OnInit, SimpleChanges } from "@angular/core";
import { Word } from "../../app.interfaces";
import { WordsService } from "../../services/words.service";

@Component({
  selector: "app-dict",
  templateUrl: "./dict.component.html",
  styleUrls: ["./dict.component.styl"]
})
export class DictComponent implements OnInit {
  words: Word[];
  newWords: Word[] = [];

  isAdd = false;
  canSave: boolean;
  userInput = "";

  constructor(private wordsService: WordsService) {}

  ngOnInit() {
    this.words = this.wordsService.getAll();
    console.log(this.words);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  onTranslate(): void {
    this.canSave = false;
    this.wordsService.parseWords(this.userInput).subscribe(
      data => this.newWords.push(...data),
      err => console.error(),
      () => (this.canSave = true)
    );
  }

  onSave(): void {
    this.wordsService.save(this.newWords);
    this.newWords = [];
    this.userInput = "";
    this.isAdd = false;
    this.words = this.wordsService.getAll();
  }
}
