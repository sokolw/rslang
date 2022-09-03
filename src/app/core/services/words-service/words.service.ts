import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, concatMap, of } from 'rxjs';
import Word from './word';
import { REMOTE_URL_API, WORDS_ENDPOINT } from '../../constants/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const MIN_PAGE = 0;
const MAX_PAGE = 29;

@Injectable({
  providedIn: 'root',
})
export default class WordsService {
  constructor(private http: HttpClient) {}

  getWords(group: number, page: number): Observable<Array<Word>> {
    return this.http.get<Array<Word>>(
      `${REMOTE_URL_API}${WORDS_ENDPOINT}?group=${group}&page=${page}`,
      httpOptions,
    );
  }

  getWordsForGame(wordCount: number, group: number, page?: number) {
    if (group && page) {
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
        return of(arrWords.slice(0, wordCount));
      }),
    );
  }
}
