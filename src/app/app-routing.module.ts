import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainPageContainerComponent from './main-page/main-page-container/main-page-container.component';
import PageNotFoundComponent from './shared/page-not-found/page-not-found.component';
import SprintGameComponent from './sprint-game/sprint-game.component';

const routes: Routes = [
  { path: '', component: MainPageContainerComponent },
  { path: 'sprint', component: SprintGameComponent },
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
