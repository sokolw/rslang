import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import SignInData from '../../core/auth/sign-in-data';
import AuthService from '../../core/auth/auth.service';
import TokenStorageService from '../../core/auth/token-storage.service';
import { CLOSE, FAIL_LOGIN } from '../constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  isPasswordVisible = false;

  isLoading = false;

  @Output() typeOfAuthShown: EventEmitter<string> = new EventEmitter<string>();

  @Output() stateMessage: EventEmitter<string> = new EventEmitter<string>();

  @Output() stateAuth: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) {}

  onSubmit(f: NgForm) {
    const signInData = f.form.value as SignInData;
    this.isLoading = true;
    this.authService.attemptAuth(signInData).subscribe(
      (res) => {
        this.tokenStorageService.saveToken(res.token);
        this.tokenStorageService.saveUsername(res.name);
        this.tokenStorageService.saveUserId(res.userId);
        this.tokenStorageService.saveRefreshToken(res.refreshToken);
        this.isLoading = false;
        this.typeOfAuthShown.emit(CLOSE);
        this.stateAuth.emit(true);
        this.stateMessage.emit(`Добро пожаловать ${res.name}!`);
      },
      () => {
        this.isLoading = false;
        this.typeOfAuthShown.emit(CLOSE);
        this.stateMessage.emit(FAIL_LOGIN);
      },
    );
  }

  closePopup(event: Event) {
    const overlayElem = event.target as HTMLElement;
    const buttonElem = event.currentTarget as HTMLElement;
    if (buttonElem.className === 'button__close' || overlayElem.className === 'overlay') {
      this.typeOfAuthShown.emit(CLOSE);
    }
  }

  togglePasswordVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
