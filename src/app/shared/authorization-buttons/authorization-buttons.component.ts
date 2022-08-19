import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorization-buttons',
  templateUrl: './authorization-buttons.component.html',
  styleUrls: ['./authorization-buttons.component.scss'],
})
export default class AuthorizationButtonsComponent implements OnInit {
  ngOnInit(): void {
    console.log('AuthorizationButtonsComponent');
  }
}
