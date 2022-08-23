import { Component, EventEmitter, Output } from '@angular/core';
import { LOGIN, REGISTER } from '../constants/constants';

@Component({
  selector: 'app-authorization-buttons',
  templateUrl: './authorization-buttons.component.html',
  styleUrls: ['./authorization-buttons.component.scss'],
})
export default class AuthorizationButtonsComponent {
  @Output() typeOfAuthShown: EventEmitter<string> = new EventEmitter<string>();

  openLogin() {
    this.typeOfAuthShown.emit(LOGIN);
  }

  openRegister() {
    this.typeOfAuthShown.emit(REGISTER);
  }
}
