import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, concatMap, forkJoin, of } from 'rxjs';
import TokenStorageService from '../../auth/token-storage.service';
import UserWord from './model/user-word';
import {
  EASY,
  LEARNED,
  MAX_STREAK_TO_SET_LEARN,
  REMOTE_URL_API,
  USERS_ENDPOINT,
  WORDS_ENDPOINT,
} from '../../constants/constants';
import Word from '../words-service/word';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export default class UserWordsService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

  userWordUrl = '';

  wordsStatsAfterUpdate = { newWords: 0, learnedWords: 0 };

  updateUserWords(words: Array<Word & { isCorrect: boolean }>) {
    if (this.userWordUrl.length === 0) {
      this.userWordUrl = this.getUserWordUrl();
    }

    return forkJoin(
      words.map((word) => {
        return this.http.get<UserWord>(this.getUrlWithWordId(word.id), httpOptions).pipe(
          concatMap((userWord) => {
            const updatedUserWord = new UserWord(userWord.difficulty, userWord.optional);
            if (word.isCorrect) {
              updatedUserWord.optional.correct += 1;
              updatedUserWord.optional.combo += 1;
            } else {
              updatedUserWord.optional.incorrect += 1;
              updatedUserWord.optional.combo = 0;
            }

            if (updatedUserWord.optional.combo > MAX_STREAK_TO_SET_LEARN) {
              updatedUserWord.difficulty = LEARNED;
              this.wordsStatsAfterUpdate.learnedWords += 1;
            } else if (updatedUserWord.difficulty === LEARNED) {
              updatedUserWord.difficulty = EASY;
            }

            return this.http.put<UserWord>(
              this.getUrlWithWordId(word.id),
              updatedUserWord,
              httpOptions,
            );
          }),
          catchError(() => {
            const userWord = new UserWord(EASY, {
              correct: +word.isCorrect,
              incorrect: +!word.isCorrect,
              combo: +word.isCorrect,
            });
            this.wordsStatsAfterUpdate.newWords += 1;
            return this.http.post<UserWord>(this.getUrlWithWordId(word.id), userWord, httpOptions);
          }),
        );
      }),
    ).pipe(concatMap(() => of(this.wordsStatsAfterUpdate)));
  }

  private getUserWordUrl(): string {
    const userId = this.tokenStorageService.getUserId();
    if (userId) {
      return `${REMOTE_URL_API}${USERS_ENDPOINT}/${userId}${WORDS_ENDPOINT}`;
    }
    return '';
  }

  private getUrlWithWordId(wordId: string) {
    return `${this.userWordUrl}/${wordId}`;
  }

  clearInstance() {
    this.wordsStatsAfterUpdate = { newWords: 0, learnedWords: 0 };
  }
}
