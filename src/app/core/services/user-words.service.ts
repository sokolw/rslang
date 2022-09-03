import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import TokenStorageService from '../auth/token-storage.service';
import { REMOTE_URL_API } from '../constants/constants';
import IUserWords from '../intefaces/iuser-words';
import { IWordResponse } from '../intefaces/iword-response';
// @ts-ignore
import { IAggregatedWordsResponse } from '../intefaces/iaggregated-words-response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const filter = `{"userWord.difficulty":"hard"}`;

@Injectable({
  providedIn: 'root',
})
export default class UserWordsService {
  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient) {}

  getAllUserWords() {
    const userId = this.tokenStorageService.getUserId();
    return this.http.get<IWordResponse[]>(`${REMOTE_URL_API}/users/${userId}/words/`, httpOptions);
  }

  createUserWord(wordId: string, body: IUserWords) {
    const userId = this.tokenStorageService.getUserId();
    return this.http.post<IUserWords>(
      `${REMOTE_URL_API}/users/${userId}/words/${wordId}`,
      body,
      httpOptions,
    );
  }

  aggregatedWords(page: number) {
    const userId = this.tokenStorageService.getUserId();
    return this.http.get<IAggregatedWordsResponse[]>(
      `${REMOTE_URL_API}/users/${userId}/aggregatedWords/?page=${page}&wordsPerPage=20&filter=${filter}`,
      httpOptions,
    );
  }

  getUserWord(wordId: string) {
    const userId = this.tokenStorageService.getUserId();
    return this.http.get<IWordResponse>(
      `${REMOTE_URL_API}/users/${userId}/words/${wordId}`,
      httpOptions,
    );
  }

  updateUserWord(wordId: string, body: IUserWords) {
    const userId = this.tokenStorageService.getUserId();
    return this.http.put<IUserWords>(
      `${REMOTE_URL_API}/users/${userId}/words/${wordId}`,
      body,
      httpOptions,
    );
  }
}
