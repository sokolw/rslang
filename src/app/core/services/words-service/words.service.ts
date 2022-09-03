import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, concatMap, of } from 'rxjs';
import Word from './word';
import {
  HARD_GROUP_VALUE,
  REMOTE_URL_API,
  USERS_ENDPOINT,
  WORDS_ENDPOINT,
} from '../../constants/constants';
import shuffle from '../../../utilities/shuffle';
import TokenStorageService from '../../auth/token-storage.service';
import { IAggregatedWordsResponse } from '../../intefaces/iaggregated-words-response';
import { IAggregatedWords } from '../../intefaces/iaggregated-words';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const MIN_PAGE = 0;
const MAX_PAGE = 29;
const MAX_GROUP = 5;
const FILTER = `{"userWord.difficulty":"hard"}`;

@Injectable({
  providedIn: 'root',
})
export default class WordsService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

  getWords(group: number, page: number): Observable<Array<Word>> {
    return this.http.get<Array<Word>>(
      `${REMOTE_URL_API}${WORDS_ENDPOINT}?group=${group}&page=${page}`,
      httpOptions,
    );
  }

  getWordsForGame(wordCount: number, group: number, page?: number) {
    if (group === HARD_GROUP_VALUE) {
      return this.getHardWordForGame(wordCount);
    }
    if (group !== undefined && page !== undefined) {
      return this.getExtraWords(wordCount, group, page);
    }

    return this.getExtraWords(wordCount, group, Math.floor(Math.random() * MAX_PAGE));
  }

  private getExtraWords(
    wordCount: number,
    group: number,
    page: number,
    words?: Array<Word>,
  ): Observable<Array<Word>> {
    return this.getWords(group, page).pipe(
      concatMap((rawWords) => {
        const arrWords: Array<Word> = [...rawWords, ...(words || [])];
        if (wordCount > arrWords.length) {
          const pages = { next: page - 1 };
          if (pages.next < MIN_PAGE) {
            pages.next = MAX_PAGE;
          }
          return this.getExtraWords(wordCount, group, pages.next, arrWords);
        }
        return of(shuffle(arrWords).slice(0, wordCount));
      }),
    );
  }

  getHardWordForGame(wordCount: number) {
    return this.getAggregatedWords(wordCount)
      .pipe(
        concatMap((words) => {
          return of(
            words[0].paginatedResults.map((word) => {
              const rawWord = JSON.parse(
                JSON.stringify(word).replace('_id', 'id'),
              ) as IAggregatedWords;
              return { ...rawWord } as Word;
            }),
          );
        }),
      )
      .pipe(
        concatMap((words) => {
          if (wordCount > words.length) {
            return this.getExtraWords(
              wordCount,
              this.getRandomGroup(),
              this.getRandomPage(),
              words,
            );
          }
          return of(words);
        }),
      );
  }

  getAggregatedWords(wordCount: number) {
    return this.http.get<IAggregatedWordsResponse[]>(
      this.getUrlAggregatedWords(wordCount),
      httpOptions,
    );
  }

  private getUrlAggregatedWords(wordCount: number) {
    const userId = this.tokenStorageService.getUserId();
    if (userId) {
      return `${REMOTE_URL_API}${USERS_ENDPOINT}/${userId}/aggregatedWords?page=0&wordsPerPage=${wordCount}&filter=${FILTER}`;
    }
    return '';
  }

  private getRandomPage() {
    return Math.floor(Math.random() * MAX_PAGE);
  }

  private getRandomGroup() {
    return Math.floor(Math.random() * MAX_GROUP);
  }
}
