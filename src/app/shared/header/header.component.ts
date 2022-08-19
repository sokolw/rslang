import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  authorized: boolean;

  dropdownMenu = false;

  constructor() {
    this.authorized = false;
  }

  ngOnInit(): void {
    console.log('header component init');
  }
}
