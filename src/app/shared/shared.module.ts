import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import HeaderComponent from './header/header.component';
import FooterComponent from './footer/footer.component';
import AuthorizationButtonsComponent from './authorization-buttons/authorization-buttons.component';
import DropdownMenuComponent from './dropdown-menu/dropdown-menu.component';
import UserAccountComponent from './user-account/user-account.component';
import RegisterComponent from './register/register.component';
import PopupMessageComponent from './popup-message/popup-message.component';
import LoginComponent from './login/login.component';
import PageNotFoundComponent from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthorizationButtonsComponent,
    DropdownMenuComponent,
    UserAccountComponent,

    RegisterComponent,
    LoginComponent,
    PopupMessageComponent,
    PageNotFoundComponent,
  ],
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],

  exports: [HeaderComponent, FooterComponent],
})
export default class SharedModule {}
