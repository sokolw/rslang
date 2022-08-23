import { Component, OnInit } from '@angular/core';
import { CLOSE, LOGIN, REGISTER } from '../constants/constants';
import AuthService from '../../core/auth/auth.service';
import TokenStorageService from '../../core/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  authorized = false;

  isLoading = false;

  dropdownMenu = false;

  loginPopupDisplayed = false;

  registerPopupDisplayed = false;

  messagePopupDisplayed = false;

  stateMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    const userId = this.tokenStorage.getUserId();
    if (userId) {
      this.isLoading = true;
      this.authService.updateUserTokens(userId).subscribe(
        (res) => {
          this.tokenStorage.saveToken(res.token);
          this.tokenStorage.saveRefreshToken(res.refreshToken);
          this.authorized = true;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.tokenStorage.signOut();
          this.authorized = false;
          this.isLoading = false;
        },
      );
    }
  }

  displayPopup(type: string) {
    if (type === LOGIN) {
      this.loginPopupDisplayed = true;
    }

    if (type === REGISTER) {
      this.registerPopupDisplayed = true;
    }

    if (type === CLOSE) {
      this.loginPopupDisplayed = false;
      this.registerPopupDisplayed = false;
      this.messagePopupDisplayed = false;
    }
  }

  displayPopupMessage(msg: string) {
    this.messagePopupDisplayed = true;
    this.stateMessage = msg;
  }

  setAuth(state: boolean) {
    this.authorized = state;
  }
}
