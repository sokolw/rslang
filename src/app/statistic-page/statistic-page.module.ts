import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import StatisticPageContainerComponent from './statistic-page-container/statistic-page-container.component';

@NgModule({
  declarations: [StatisticPageContainerComponent],
  imports: [CommonModule],

  exports: [StatisticPageContainerComponent],
})
export default class StatisticPageModule {}
