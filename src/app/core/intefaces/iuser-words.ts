export default interface IUserWords {
  difficulty: string;
  optional?: {
    correct: number;
    incorrect: number;
    combo: number;
  };
}
