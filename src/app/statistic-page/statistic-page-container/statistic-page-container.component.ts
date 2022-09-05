import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { GAME_AUDIO_CALL, GAME_SPRINT } from 'src/app/core/constants/constants';
import StatisticsService from '../../core/services/statistics-service/statistics.service';
import UserLongTermStats from '../../core/services/statistics-service/model/user-long-term-stats';
import UserPerDayStats from '../../core/services/statistics-service/model/user-per-day-stats';
import TokenStorageService from '../../core/auth/token-storage.service';

const CHART_NAMES = ['Количество новых слов', 'Количество изученных слов'];
const RU_WORD = 'слов';

@Component({
  selector: 'app-statistic-page-container',
  templateUrl: './statistic-page-container.component.html',
  styleUrls: ['./statistic-page-container.component.scss'],
})
export default class StatisticPageContainerComponent implements OnInit {
  constructor(
    private statisticsService: StatisticsService,
    private tokenStorageService: TokenStorageService,
  ) {}

  subscription = new Subscription();

  authorized = false;

  hasStats = false;

  isLoading = false;

  longStats: Array<UserLongTermStats> = [];

  perStats: UserPerDayStats = new UserPerDayStats(new Date(), 0, 0, [], 0, []);

  charts: Array<{ chartName: string; chart: ChartConfiguration<'line'>['data'] }> = [];

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  lineChartLegend = false;

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.authorized = true;
      this.isLoading = true;
      this.subscription = this.statisticsService.getUserStats().subscribe((stats) => {
        if (stats === null) {
          this.hasStats = false;
        } else {
          this.longStats = stats.longTermStats;
          this.perStats = stats.perDayStats;
          this.perStats.gamesStats = this.perStats.gamesStats.map((game) => {
            return { ...game, name: this.changeGameName(game.name) };
          });
          this.createCartsConfiguration();
          this.hasStats = true;
        }
        this.isLoading = false;
      });
    }
  }

  changeGameName(name: string) {
    if (name === GAME_AUDIO_CALL) {
      return 'Аудиовызов';
    }
    if (name === GAME_SPRINT) {
      return 'Спринт';
    }
    return name;
  }

  createCartsConfiguration() {
    const dates = this.longStats
      .map((stats) => new Date(stats.date))
      .map(
        (date) => `${this.formatNumber(date.getDate())}.${this.formatNumber(date.getMonth() + 1)}`,
      );
    const newWords = this.longStats.map((stats) => stats.newWords);
    const learnedWords = this.longStats.map((stats) => stats.learnedWords);
    const longStats = [newWords, learnedWords];
    CHART_NAMES.forEach((item, index) => {
      this.charts.push({
        chartName: item,
        chart: {
          labels: dates,
          datasets: [
            {
              data: longStats[index],
              label: RU_WORD,
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(162, 0, 255, 0.1)',
            },
          ],
        },
      });
    });
  }

  private formatNumber(num: number) {
    return num.toString().padStart(2, '0');
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['day1', 'day2', 'day3', 'day4'],
    datasets: [
      {
        data: [10, 5, 20, 15],
        label: 'новых слов',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
}
