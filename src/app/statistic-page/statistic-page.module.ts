import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import StatisticPageContainerComponent from './statistic-page-container/statistic-page-container.component';

@NgModule({
  declarations: [StatisticPageContainerComponent],
  imports: [CommonModule, NgChartsModule, MatProgressSpinnerModule],

  exports: [StatisticPageContainerComponent],
})
export default class StatisticPageModule {}
