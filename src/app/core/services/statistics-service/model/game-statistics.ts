export default class GameStatistics {
  constructor(
    public name: string,
    public newWordsPerDay: number,
    public percentCorrectAnswers: number,
    public longestStreakCorrectAnswers: number,
    public percentagesCorrectAnswers?: Array<number>,
  ) {}
}
