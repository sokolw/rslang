import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import GameSprintContainerComponent from './game-sprint-container/game-sprint-container.component';
import GameProcessComponent from './game-process/game-process.component';
import TimerComponent from './game-process/timer/timer.component';
import GameSelectDifficultyComponent from './game-select-difficulty/game-select-difficulty.component';
import GameAudioCallModule from '../game-audio-call/game-audio-call.module';

@NgModule({
  declarations: [
    GameSprintContainerComponent,
    GameProcessComponent,
    TimerComponent,
    GameSelectDifficultyComponent,
  ],
  imports: [CommonModule, GameAudioCallModule],

  exports: [GameSprintContainerComponent],
})
export default class GameSprintModule {}
