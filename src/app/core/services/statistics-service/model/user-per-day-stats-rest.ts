export default class UserPerDayStatsRest {
  constructor(
    public learnedWords: number,
    public optional: { perDayStats: string; longTermStats: string },
  ) {}
}
