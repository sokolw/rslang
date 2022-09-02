import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import TokenStorageService from '../../core/auth/token-storage.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export default class UserAccountComponent implements OnInit {
  dropdownMenu = false;

  userName = '';

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.tokenStorageService.getUsername();
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.reloadPage();
  }

  reloadPage() {
    this.router.navigate(['/']);
    window.location.reload();
  }
}
