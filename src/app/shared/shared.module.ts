import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import HeaderComponent from './header/header.component';
import AuthorizationButtonsComponent from './authorization-buttons/authorization-buttons.component';
import DropdownMenuComponent from './dropdown-menu/dropdown-menu.component';
import UserAccountComponent from './user-account/user-account.component';
import FooterComponent from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AuthorizationButtonsComponent,
    DropdownMenuComponent,
    UserAccountComponent,
    FooterComponent,
  ],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent],
})
export default class SharedModule {}
