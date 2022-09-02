import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainPageContainerComponent from './main-page/main-page-container/main-page-container.component';
import PageNotFoundComponent from './shared/page-not-found/page-not-found.component';
import { GAME_AUDIO_CALL } from './core/constants/constants';
import GameAudioCallContainerComponent from './game-audio-call/game-audio-call-container/game-audio-call-container.component';

const routes: Routes = [
  { path: '', component: MainPageContainerComponent },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
  { path: GAME_AUDIO_CALL, component: GameAudioCallContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export default class AppRoutingModule {}
