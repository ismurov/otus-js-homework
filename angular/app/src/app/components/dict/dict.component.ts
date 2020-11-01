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

  addMode = false;
  canSave: boolean;
  userInput = "";

  constructor(
    private wordsService: WordsService,
  ) {}

  ngOnInit() {
    this.words = this.wordsService.getAll();
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
    this.words = this.wordsService.getAll();
    this.onCancel();
  }

  onCancel() {
    this.addMode = false;
    this.newWords = [];
    this.userInput = '';
  }
}
