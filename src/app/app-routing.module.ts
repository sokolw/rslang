import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainPageContainerComponent from './main-page/main-page-container/main-page-container.component';
import PageNotFoundComponent from './shared/page-not-found/page-not-found.component';
import { GAME_AUDIO_CALL, GAME_SPRINT, STATS } from './core/constants/constants';
import GameAudioCallContainerComponent from './game-audio-call/game-audio-call-container/game-audio-call-container.component';
import StatisticPageContainerComponent from './statistic-page/statistic-page-container/statistic-page-container.component';
import GameSprintContainerComponent from './game-sprint/game-sprint-container/game-sprint-container.component';

const routes: Routes = [
  { path: GAME_AUDIO_CALL, component: GameAudioCallContainerComponent },
  { path: STATS, component: StatisticPageContainerComponent },
  { path: GAME_SPRINT, component: GameSprintContainerComponent },
  { path: '', component: MainPageContainerComponent },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export default class AppRoutingModule {}
