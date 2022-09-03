import { Injectable } from '@angular/core';
import { Observable, concatMap, of } from 'rxjs';
import TokenStorageService from '../../auth/token-storage.service';
import UserWordsService from '../user-words-service/user-words.service';
import Word from '../words-service/word';
import WordsService from '../words-service/words.service';
import StatisticsService from '../statistics-service/statistics.service';
import IAudioQuestion from './interfaces/iaudio-question';
import IGameResult from './interfaces/igame-result';
import { GAME_AUDIO_CALL, REMOTE_URL_API } from '../../constants/constants';
import GameStatistics from '../statistics-service/model/game-statistics';
import IAnswer from './interfaces/ianswer';

const DEFAULT_WORDS_IN_GAME = 10;
const POINTS_MULTIPLIER = 10;
const EXP_MULTIPLIER = 1;
const POINTS_FOR_ANSWER = 1;

@Injectable({
  providedIn: 'root',
})
export default class GameAudioCallService {
  constructor(
    private words: WordsService,
    private statisticsService: StatisticsService,
    private userWordsService: UserWordsService,
    private tokenStorageService: TokenStorageService,
  ) {}

  questions: Array<IAudioQuestion> = [];

  currentQuestion = -1;

  currentWords: Array<Word> = [];

  gameResult: IGameResult = {
    totalCorrect: 0,
    totalIncorrect: 0,
    totalPoints: 0,
    totalExperience: 0,
    wordsWithStatus: [],
  };

  maxStreakCorrectAnswers = 0;

  currentStreakCorrectAnswers = 0;

  start(level: number): Observable<IAudioQuestion | null> {
    return this.words.getWordsForGame(DEFAULT_WORDS_IN_GAME, level).pipe(
      concatMap((gameWords) => {
        this.currentWords = gameWords;
        for (let i = 0; i < this.currentWords.length; i += 1) {
          this.questions.push({
            question: `${REMOTE_URL_API}/${this.currentWords[i].audio}`,
            answers: this.getRandomAnswers(this.currentWords[i], this.currentWords),
          });
        }
        return of(this.getNextQuestion());
      }),
    );
  }

  getNextQuestion(): IAudioQuestion | null {
    if (this.currentQuestion < this.questions.length) {
      this.currentQuestion += 1;
      return this.questions[this.currentQuestion];
    }

    return null;
  }

  checkAnswer(id: number) {
    if (id > -1) {
      const { isCorrect } = this.questions[this.currentQuestion].answers[id];
      this.gameResult.wordsWithStatus.push({
        ...this.currentWords[this.currentQuestion],
        isCorrect,
        audio: this.questions[this.currentQuestion].question,
      });
      if (isCorrect) {
        this.gameResult.totalPoints += POINTS_FOR_ANSWER * POINTS_MULTIPLIER;
        this.gameResult.totalExperience += POINTS_FOR_ANSWER * EXP_MULTIPLIER;
        this.increaseStreakCorrectAnswers();
      } else {
        this.resetStreakCorrectAnswers();
      }
      this.gameResult.totalCorrect += +isCorrect;
      this.gameResult.totalIncorrect += +!isCorrect;
    } else {
      this.gameResult.wordsWithStatus.push({
        ...this.currentWords[this.currentQuestion],
        isCorrect: false,
        audio: this.questions[this.currentQuestion].question,
      });
      this.resetStreakCorrectAnswers();
      this.gameResult.totalIncorrect += +!false;
    }
  }

  increaseStreakCorrectAnswers() {
    this.currentStreakCorrectAnswers += 1;
  }

  resetStreakCorrectAnswers() {
    if (this.currentStreakCorrectAnswers > this.maxStreakCorrectAnswers) {
      this.maxStreakCorrectAnswers = this.currentStreakCorrectAnswers;
    }
    this.currentStreakCorrectAnswers = 0;
  }

  getGameResult(): Observable<IGameResult> {
    this.resetStreakCorrectAnswers();

    if (this.tokenStorageService.getToken()) {
      return this.userWordsService.updateUserWords(this.gameResult.wordsWithStatus).pipe(
        concatMap(({ newWords, learnedWords }) => {
          const gameStats = new GameStatistics(
            GAME_AUDIO_CALL,
            newWords,
            this.getPercentCorrectAnswers(),
            this.maxStreakCorrectAnswers,
          );
          return this.statisticsService.saveGameStatsPerDay(gameStats, learnedWords);
        }),
        concatMap(() => {
          return of(this.gameResult);
        }),
      );
    }

    return of(this.gameResult);
  }

  getPercentCorrectAnswers(): number {
    return (this.gameResult.totalCorrect / this.currentWords.length) * 100;
  }

  getRandomAnswers(validAnswer: Word, arrWords: Array<Word>): Array<IAnswer> {
    const TOTAL_ANSWERS = 5;
    const answers: Array<IAnswer> = [{ answer: validAnswer.wordTranslate, isCorrect: true }];

    while (answers.length !== TOTAL_ANSWERS) {
      const tempAnswer = arrWords[Math.floor(Math.random() * arrWords.length)];
      if (!this.includesWord(tempAnswer, answers)) {
        answers.push({ answer: tempAnswer.wordTranslate, isCorrect: false });
      }
    }

    return this.shuffle(answers);
  }

  includesWord(checkedWord: Word, answers: Array<IAnswer>): boolean {
    for (let i = 0; i < answers.length; i += 1) {
      if (answers[i].answer === checkedWord.wordTranslate) {
        return true;
      }
    }

    return false;
  }

  shuffle(arr: Array<IAnswer>) {
    const resultArr = arr;
    let currentIndex = resultArr.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [resultArr[currentIndex], resultArr[randomIndex]] = [
        resultArr[randomIndex],
        resultArr[currentIndex],
      ];
    }

    return resultArr;
  }

  restart() {
    this.gameResult = {
      totalCorrect: 0,
      totalIncorrect: 0,
      totalPoints: 0,
      totalExperience: 0,
      wordsWithStatus: [],
    };
    this.maxStreakCorrectAnswers = 0;
    this.currentStreakCorrectAnswers = 0;
    this.currentQuestion = -1;
  }

  clearInstance() {
    this.userWordsService.clearInstance();

    this.questions = [];
    this.currentQuestion = -1;
    this.currentWords = [];
    this.gameResult = {
      totalCorrect: 0,
      totalIncorrect: 0,
      totalPoints: 0,
      totalExperience: 0,
      wordsWithStatus: [],
    };
    this.maxStreakCorrectAnswers = 0;
    this.currentStreakCorrectAnswers = 0;
  }
}
