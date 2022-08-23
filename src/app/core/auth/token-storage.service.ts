import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const REFRESH_TOKEN_KEY = 'AuthRefreshToken';
const USER_NAME = 'AuthUsername';
const USER_ID = 'AuthUserId';

@Injectable({
  providedIn: 'root',
})
export default class TokenStorageService {
  signOut() {
    localStorage.clear();
  }

  saveToken(token: string) {
    this.saveItem(token, TOKEN_KEY);
  }

  getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token || '';
  }

  saveUsername(username: string) {
    this.saveItem(username, USER_NAME);
  }

  getUsername(): string {
    const username = localStorage.getItem(USER_NAME);
    return username || '';
  }

  saveUserId(userId: string) {
    this.saveItem(userId, USER_ID);
  }

  getUserId(): string {
    const userId = localStorage.getItem(USER_ID);
    return userId || '';
  }

  saveRefreshToken(refreshToken: string) {
    this.saveItem(refreshToken, REFRESH_TOKEN_KEY);
  }

  getRefreshToken(): string {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    return refreshToken || '';
  }

  private saveItem(item: string, key: string) {
    localStorage.removeItem(key);
    localStorage.setItem(key, item);
  }
}
