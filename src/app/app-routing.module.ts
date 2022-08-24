import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import TextBookPageContainerComponent from './text-book/text-book-page-container/text-book-page-container.component';

const routes: Routes = [{ path: 'textbook', component: TextBookPageContainerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
