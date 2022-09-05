import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import SignInResponse from './sign-in-response';
import SignInData from './sign-in-data';
import RegistrationData from './registration-data';
import {
  REMOTE_URL_API,
  SIGNIN_ENDPOINT,
  USERS_ENDPOINT,
  TOKENS_ENDPOINT,
} from '../constants/constants';
import TokensResponse from './tokens-response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private registrationUrl = `${REMOTE_URL_API}${USERS_ENDPOINT}`;

  private signInUrl = `${REMOTE_URL_API}${SIGNIN_ENDPOINT}`;

  attemptAuth(credentials: SignInData): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(this.signInUrl, credentials, httpOptions);
  }

  registerUser(registrationData: RegistrationData): Observable<string> {
    return this.http.post<string>(this.registrationUrl, registrationData, httpOptions);
  }

  updateUserTokens(userId: string): Observable<TokensResponse> {
    const tokensUrl = `${REMOTE_URL_API}${USERS_ENDPOINT}/${userId}${TOKENS_ENDPOINT}`;
    return this.http.get<TokensResponse>(tokensUrl, httpOptions);
  }

  constructor(private http: HttpClient) {}
}
