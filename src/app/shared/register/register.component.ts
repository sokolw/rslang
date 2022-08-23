import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import AuthService from 'src/app/core/auth/auth.service';
import RegistrationData from 'src/app/core/auth/registration-data';
import { CLOSE, SUCCESS_REGISTRATION } from '../constants/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export default class RegisterComponent {
  isPasswordVisible = false;

  isLoading = false;

  @Output() typeOfAuthShown: EventEmitter<string> = new EventEmitter<string>();

  @Output() stateMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authService: AuthService) {}

  onSubmit(f: NgForm) {
    const registrationData = f.form.value as RegistrationData;
    this.isLoading = true;
    this.authService.registerUser(registrationData).subscribe(
      () => {
        this.isLoading = false;
        this.typeOfAuthShown.emit(CLOSE);
        this.stateMessage.emit(SUCCESS_REGISTRATION);
      },
      (error) => {
        this.isLoading = false;
        this.typeOfAuthShown.emit(CLOSE);
        this.stateMessage.emit(error.error);
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
