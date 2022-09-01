import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
})
export default class GameSettingsComponent {
  constructor(private router: Router) {}

  currentLevel = 0;

  levelSelected = false;

  @Output() selectedLevel: EventEmitter<number> = new EventEmitter<number>();

  levels = [
    { value: '0', viewValue: 'Уровень 1' },
    { value: '1', viewValue: 'Уровень 2' },
    { value: '2', viewValue: 'Уровень 3' },
    { value: '3', viewValue: 'Уровень 4' },
    { value: '4', viewValue: 'Уровень 5' },
    { value: '5', viewValue: 'Уровень 6' },
  ];

  redirectToMain() {
    this.router.navigate(['/']);
  }

  setCurrentLevel(value: string) {
    this.levelSelected = true;
    this.currentLevel = +value;
  }

  setLevel() {
    this.selectedLevel.emit(this.currentLevel);
  }
}
