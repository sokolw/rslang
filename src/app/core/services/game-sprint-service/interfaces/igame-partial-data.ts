import IGameStreakStats from './igame-streak-stats';
import IQuestion from './iquestion';

export default interface IGamePartialData {
  question: IQuestion;
  streakStats: IGameStreakStats;
  points: number;
}
