import Word from '../../words-service/word';

export default interface IGameResult {
  totalCorrect: number;
  totalIncorrect: number;
  totalPoints: number;
  totalExperience: number;
  wordsWithStatus: Array<Word & { isCorrect: boolean }>;
}
