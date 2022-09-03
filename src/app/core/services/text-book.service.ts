import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { REMOTE_URL_API } from '../constants/constants';
import IWords from '../intefaces/iwords';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export default class TextBookService {
  constructor(private http: HttpClient) {}

  getWords(group: number, page: number) {
    return this.http.get<IWords[]>(
      `${REMOTE_URL_API}/words?group=${group}&page=${page}`,
      httpOptions,
    );
  }

  getWord(wordId: string) {
    return this.http.get<IWords>(`${REMOTE_URL_API}/words/${wordId}`, httpOptions);
  }
}
