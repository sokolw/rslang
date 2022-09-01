import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GAME_AUDIO_CALL } from './core/constants/constants';
import GameAudioCallContainerComponent from './game-audio-call/game-audio-call-container/game-audio-call-container.component';

const routes: Routes = [{ path: GAME_AUDIO_CALL, component: GameAudioCallContainerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export default class AppRoutingModule {}
