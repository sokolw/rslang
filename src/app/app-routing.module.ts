import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainPageContainerComponent from './main-page/main-page-container/main-page-container.component';

const routes: Routes = [{ path: '', component: MainPageContainerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
