import { Component } from '@angular/core';

@Component({
  selector: 'app-game-select-difficulty',
  templateUrl: './game-select-difficulty.component.html',
  styleUrls: ['./game-select-difficulty.component.scss'],
})
export default class GameSelectDifficultyComponent {
  // constructor() {}

  handleSelectDifficulty(e: Event) {
    const target = e.target as HTMLElement;
    if (target.tagName === 'LI') {
      console.log(target.textContent);
    }
  }

  // ngOnInit(): void {}
}
