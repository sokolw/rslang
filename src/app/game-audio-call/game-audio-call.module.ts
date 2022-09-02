import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import GameAudioCallContainerComponent from './game-audio-call-container/game-audio-call-container.component';
import GameSettingsComponent from './game-settings/game-settings.component';
import AudioCallQuestionComponent from './audio-call-question/audio-call-question.component';
import AudioCallResultComponent from './audio-call-result/audio-call-result.component';

@NgModule({
  declarations: [
    GameAudioCallContainerComponent,
    GameSettingsComponent,
    AudioCallQuestionComponent,
    AudioCallResultComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],

  exports: [GameAudioCallContainerComponent],
})
export default class GameAudioCallModule {}
