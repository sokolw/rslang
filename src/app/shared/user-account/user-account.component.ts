import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export default class UserAccountComponent implements OnInit {
  ngOnInit(): void {
    console.log('UserAccountComponent');
  }
}