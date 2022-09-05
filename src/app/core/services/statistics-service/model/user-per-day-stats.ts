import GameStatistics from './game-statistics';

export default class UserPerDayStats {
  constructor(
    public currentDay: Date,
    public learnedWordsPerDay: number,
    public newWordsPerDay: number,
    public percentagesCorrectAnswers: Array<number>,
    public overallPercentageCorrectAnswers: number,
    public gamesStats: Array<GameStatistics>,
  ) {}
}
