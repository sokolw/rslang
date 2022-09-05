import { Injectable } from '@angular/core';
import { concatMap, Observable, of } from 'rxjs';
import Word from '../words-service/word';
import WordsService from '../words-service/words.service';
import IQuestion from './interfaces/iquestion';

const DEFAULT_WORDS_IN_GAME = 20;

@Injectable({
  providedIn: 'root',
})
export default class GameSprintService {
  constructor(private wordsService: WordsService) {}

  private questions: Array<IQuestion> = [];

  start(group: number, page?: number): Observable<Array<IQuestion> | null> {
    return this.wordsService.getWordsForGame(DEFAULT_WORDS_IN_GAME, group, page).pipe(
      concatMap((gameWords) => {
        this.createQuestions(gameWords);
        return of(this.questions);
      }),
    );
  }

  private createQuestions(words: Array<Word>) {
    words.forEach((word, index) => {
      if (this.flipCoin()) {
        this.questions.push(this.createRightQuestion(word.word, word.wordTranslate));
      } else {
        this.questions.push(this.createWrongQuestion(word.word, index, words));
      }
    });
  }

  private createWrongQuestion(word: string, index: number, words: Array<Word>) {
    const randomIndex = this.getRandomNumberInRangeWithOutCurrentNumber(index, words.length - 1);
    return this.createRightQuestion(word, words[randomIndex].wordTranslate, false);
  }

  private getRandomNumberInRangeWithOutCurrentNumber(current: number, end: number) {
    let randomNumber = this.getRandomNumber(end);
    while (randomNumber === current) {
      randomNumber = this.getRandomNumber(end);
    }
    return randomNumber;
  }

  private getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  private createRightQuestion(
    word: string,
    questionWord: string,
    answer: boolean = true,
  ): IQuestion {
    return { word, questionWord, answer };
  }

  private flipCoin(): boolean {
    return Math.random() > 0.5;
  }
}
