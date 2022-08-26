import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { REMOTE_URL_API } from '../constants/constants';
import IWords from '../intefaces/IWords';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export default class TextBookService {
  page: number = 0;

  group: number = 0;

  constructor(private http: HttpClient) {
    this.getWords(this.group, this.page);
  }

  getWords(group: number, page: number) {
    return this.http.get<IWords[]>(
      `${REMOTE_URL_API}/words?group=${group}&page=${page}`,
      httpOptions,
    );
  }
}
