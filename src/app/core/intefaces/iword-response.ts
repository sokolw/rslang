export interface IWordResponse {
  difficulty: string;
  wordId: string;
  optional: {
    correct: number;
    incorrect: number;
    combo: number;
  };
}
