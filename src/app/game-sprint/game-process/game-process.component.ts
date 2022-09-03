import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-process',
  templateUrl: './game-process.component.html',
  styleUrls: ['./game-process.component.scss'],
})
export default class GameProcessComponent implements OnInit {
  ngOnInit(): void {
    console.log('GameProcessComponent');
  }
}
