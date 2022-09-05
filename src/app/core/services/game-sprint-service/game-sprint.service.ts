import { Injectable } from '@angular/core';
import { concatMap, Observable, of } from 'rxjs';
import IGameResult from '../game-audio-call-service/interfaces/igame-result';
import Word from '../words-service/word';
import WordsService from '../words-service/words.service';
import IQuestion from './interfaces/iquestion';
import IGamePartialData from './interfaces/igame-partial-data';
import IGameStreakStats from './interfaces/igame-streak-stats';

const DEFAULT_WORDS_IN_GAME = 20;
const BASE_POINTS_MULTIPLIER = 10;
const BASE_EXP_MULTIPLIER = 1;
const POINTS_FOR_ANSWER = 1;
const MAX_LOCAL_STREAK = 3;
const MAX_LOCAL_STREAK_POINTS = 3;

@Injectable({
  providedIn: 'root',
})
export default class GameSprintService {
  constructor(private wordsService: WordsService) {}

  private currentQuestionIndex = -1;

  private questions: Array<IQuestion> = [];

  private currentWords: Array<Word> = [];

  private gameResult: IGameResult = {
    totalCorrect: 0,
    totalIncorrect: 0,
    totalPoints: 0,
    totalExperience: 0,
    wordsWithStatus: [],
  };

  private maxStreakCorrectAnswers = 0;

  private currentStreakCorrectAnswers = 0;

  private streakStats: IGameStreakStats = {
    streak: 0,
    streakPoints: 0,
  };

  private pointsMultiplier = BASE_POINTS_MULTIPLIER;

  start(group: number, page?: number): Observable<IGamePartialData | null> {
    return this.wordsService.getWordsForGame(DEFAULT_WORDS_IN_GAME, group, page).pipe(
      concatMap((gameWords) => {
        this.currentWords = gameWords;
        this.createQuestions(gameWords);
        return of(this.getNextGameData());
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

  getNextGameData(): IGamePartialData | null {
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestionIndex += 1;
      return {
        question: this.questions[this.currentQuestionIndex],
        streakStats: this.streakStats,
        points: this.gameResult.totalPoints,
      };
    }

    return null;
  }

  checkAnswer(answer: boolean) {
    const { currentQuestionIndex } = this;
    const questionAnswer = this.questions[currentQuestionIndex].answer;
    if (questionAnswer === answer) {
      this.addWordInResult(currentQuestionIndex, true);
      this.gameResult.totalPoints += POINTS_FOR_ANSWER * this.pointsMultiplier;
      this.gameResult.totalExperience += POINTS_FOR_ANSWER * BASE_EXP_MULTIPLIER;
      this.increaseStreakCorrectAnswers();
      this.gameResult.totalCorrect += 1;
      this.manageStreak(true);
    } else {
      this.addWordInResult(currentQuestionIndex, false);
      this.resetStreakCorrectAnswers();
      this.gameResult.totalIncorrect += 1;
      this.manageStreak(false);
    }

    console.log(this.gameResult, this.streakStats, this.maxStreakCorrectAnswers);
  }

  private addWordInResult(index: number, status: boolean) {
    this.gameResult.wordsWithStatus.push({
      ...this.currentWords[index],
      isCorrect: status,
    });
  }

  private increaseStreakCorrectAnswers() {
    this.currentStreakCorrectAnswers += 1;
  }

  private resetStreakCorrectAnswers() {
    if (this.currentStreakCorrectAnswers > this.maxStreakCorrectAnswers) {
      this.maxStreakCorrectAnswers = this.currentStreakCorrectAnswers;
    }
    this.currentStreakCorrectAnswers = 0;
  }

  private manageStreak(toggle: boolean) {
    if (toggle) {
      this.increaseMultiStreak();
    } else {
      this.resetMultiStreak();
    }
  }

  private increaseMultiStreak() {
    if (
      this.streakStats.streak <= MAX_LOCAL_STREAK &&
      this.streakStats.streakPoints < MAX_LOCAL_STREAK_POINTS
    ) {
      this.streakStats.streak += 1;
      if (this.streakStats.streak > MAX_LOCAL_STREAK) {
        this.streakStats.streakPoints += 1;
        this.streakStats.streak = 0;
        this.pointsMultiplier = this.doubler(this.pointsMultiplier);
      }
    }
  }

  private resetMultiStreak() {
    this.streakStats.streakPoints = 0;
    this.streakStats.streak = 0;
    this.pointsMultiplier = BASE_POINTS_MULTIPLIER;
  }

  private doubler(num: number) {
    return num * 2;
  }
}
