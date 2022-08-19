import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import HeaderComponent from './header/header.component';
import AuthorizationButtonsComponent from './authorization-buttons/authorization-buttons.component';
import DropdownMenuComponent from './dropdown-menu/dropdown-menu.component';

@NgModule({
  declarations: [HeaderComponent, AuthorizationButtonsComponent, DropdownMenuComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export default class SharedModule {}
