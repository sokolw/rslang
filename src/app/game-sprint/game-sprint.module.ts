import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import GameSprintContainerComponent from './game-sprint-container/game-sprint-container.component';
import GameProcessComponent from './game-process/game-process.component';
import TimerComponent from './game-process/timer/timer.component';

@NgModule({
  declarations: [GameSprintContainerComponent, GameProcessComponent, TimerComponent],
  imports: [CommonModule],

  exports: [GameSprintContainerComponent],
})
export default class GameSprintModule {}
