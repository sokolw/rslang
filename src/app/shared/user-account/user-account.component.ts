import { Component, OnInit } from '@angular/core';
import TokenStorageService from '../../core/auth/token-storage.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export default class UserAccountComponent implements OnInit {
  dropdownMenu = false;

  userName = '';

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.userName = this.tokenStorageService.getUsername();
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.reloadPage();
  }

  reloadPage() {
    window.location.replace('/');
  }
}
