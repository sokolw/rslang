import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export default class DropdownMenuComponent implements OnInit {
  ngOnInit(): void {
    console.log('DropdownMenuComponent');
  }
}
