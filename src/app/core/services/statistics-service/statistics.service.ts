import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, concatMap, of} from 'rxjs';
import UserPerDayStatsRest from './model/user-per-day-stats-rest';
import {REMOTE_URL_API, STATISTICS_ENDPOINT, USERS_ENDPOINT} from '../../constants/constants';
import TokenStorageService from '../../auth/token-storage.service';
import GameStatistics from './model/game-statistics';
import UserPerDayStats from './model/user-per-day-stats';
import UserLongTermStats from './model/user-long-term-stats';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const STUB_VALUE = 0;

@Injectable({
  providedIn: 'root',
})
export default class StatisticsService {
  private userStatsUrl = '';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

  private getUserStatsUrl() {
    const userId = this.tokenStorageService.getUserId();
    if (userId) {
      this.userStatsUrl = `${REMOTE_URL_API}${USERS_ENDPOINT}/${userId}${STATISTICS_ENDPOINT}`;
    }
  }

  getUserStatsPerDay() {
    if (this.userStatsUrl.length === 0) {
      this.getUserStatsUrl();
    }

    return this.http.get<UserPerDayStatsRest>(this.userStatsUrl, httpOptions);
  }

  updateUserStatsPerDay(stats: UserPerDayStatsRest) {
    if (this.userStatsUrl.length === 0) {
      this.getUserStatsUrl();
    }

    return this.http.put<UserPerDayStatsRest>(this.userStatsUrl, stats, httpOptions);
  }

  saveGameStatsPerDay(gameStats: GameStatistics, learnedWordsPerDay: number) {
    return this.getUserStatsPerDay().pipe(
      concatMap((userStatsPerDayRest) => {
        const parsedDayStats = JSON.parse(
          userStatsPerDayRest.optional.perDayStats,
        ) as UserPerDayStats;
        const parsedLongStats = JSON.parse(
          userStatsPerDayRest.optional.longTermStats,
        ) as Array<UserLongTermStats>;

        const moddedDayStats = this.modifyUserPerDayStats(
          parsedDayStats,
          gameStats,
          learnedWordsPerDay,
        );

        const moddedLongStats = this.updateLongTermStats(parsedLongStats, moddedDayStats);

        return this.updateUserStatsPerDay(this.prepareDispatch(moddedDayStats, moddedLongStats));
      }),
      catchError(() => {
        const newUserPerDayStats = this.getNewUserPerDayStats(gameStats, learnedWordsPerDay);
        const newLongTermStats = this.createLongTermStats(newUserPerDayStats);
        return this.updateUserStatsPerDay(
          this.prepareDispatch(newUserPerDayStats, newLongTermStats),
        );
      }),
    );
  }

  modifyUserPerDayStats(
    userPerDayStats: UserPerDayStats,
    gameStats: GameStatistics,
    learnedWordsPerDay: number,
  ): UserPerDayStats {
    const moddedStats = userPerDayStats;
    if (this.compareDateWithCurrent(new Date(moddedStats.currentDay))) {
      moddedStats.learnedWordsPerDay += learnedWordsPerDay;
      moddedStats.newWordsPerDay += gameStats.newWordsPerDay;
      moddedStats.percentagesCorrectAnswers.push(gameStats.percentCorrectAnswers);
      moddedStats.overallPercentageCorrectAnswers = this.getAveragePercentage(
        moddedStats.percentagesCorrectAnswers,
      );

      const moddedGameStats = moddedStats.gamesStats.find((item) => item.name === gameStats.name);
      if (moddedGameStats) {
        moddedGameStats.newWordsPerDay += gameStats.newWordsPerDay;

        moddedGameStats.longestStreakCorrectAnswers =
          moddedGameStats.longestStreakCorrectAnswers > gameStats.longestStreakCorrectAnswers
            ? moddedGameStats.longestStreakCorrectAnswers
            : gameStats.longestStreakCorrectAnswers;

        (moddedGameStats.percentagesCorrectAnswers as Array<number>).push(
          gameStats.percentCorrectAnswers,
        );
        moddedGameStats.percentCorrectAnswers = this.getAveragePercentage(
          moddedStats.percentagesCorrectAnswers as Array<number>,
        );
      } else {
        const addedGameStats = { ...gameStats };
        addedGameStats.percentagesCorrectAnswers = [addedGameStats.percentCorrectAnswers];
        moddedStats.gamesStats.push(addedGameStats);
      }

      return moddedStats;
    }
    return this.getNewUserPerDayStats(gameStats, learnedWordsPerDay);
  }

  createLongTermStats(userPerDayStats: UserPerDayStats): Array<UserLongTermStats> {
    return [
      {
        date: userPerDayStats.currentDay,
        learnedWords: userPerDayStats.learnedWordsPerDay,
        newWords: userPerDayStats.newWordsPerDay,
      },
    ];
  }

  updateLongTermStats(longStats: Array<UserLongTermStats>, userPerDayStats: UserPerDayStats) {
    const currentLongStats = longStats.find((item) =>
      this.compareDates(new Date(item.date), new Date(userPerDayStats.currentDay)),
    );

    if (currentLongStats) {
      currentLongStats.learnedWords = userPerDayStats.learnedWordsPerDay;
      currentLongStats.newWords = userPerDayStats.newWordsPerDay;
      return longStats;
    }

    longStats.push({
      date: userPerDayStats.currentDay,
      learnedWords: userPerDayStats.learnedWordsPerDay,
      newWords: userPerDayStats.newWordsPerDay,
    });
    return longStats;
  }

  prepareDispatch(
    userPerDayStats: UserPerDayStats,
    longStats: Array<UserLongTermStats>,
  ): UserPerDayStatsRest {
    return {
      learnedWords: STUB_VALUE,
      optional: {
        perDayStats: JSON.stringify(userPerDayStats),
        longTermStats: JSON.stringify(longStats),
      },
    };
  }

  private getCurrentDate() {
    return new Date();
  }

  private compareDateWithCurrent(date: Date): boolean {
    const currentDate = this.getCurrentDate();
    return this.compareDates(currentDate, date);
  }

  private compareDates(first: Date, second: Date): boolean {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }

  private sum(prev: number, curr: number) {
    return prev + curr;
  }

  private getAveragePercentage(arr: Array<number>): number {
    return Math.floor(arr.reduce(this.sum, 0) / arr.length);
  }

  private getNewUserPerDayStats(gameStats: GameStatistics, learnedWordsPerDay: number) {
    return new UserPerDayStats(
        this.getCurrentDate(),
        learnedWordsPerDay,
        gameStats.newWordsPerDay,
        [gameStats.percentCorrectAnswers],
        gameStats.percentCorrectAnswers,
        [{...gameStats, percentagesCorrectAnswers: [gameStats.percentCorrectAnswers]}],
    );
  }

  getUserStats() {
    return this.getUserStatsPerDay().pipe(
      concatMap((stats) => {
        const longTermStats = JSON.parse(stats.optional.longTermStats) as Array<UserLongTermStats>;
        const perDayStats = JSON.parse(stats.optional.perDayStats) as UserPerDayStats;
        return of({ longTermStats, perDayStats });
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }
}
