export default class UserWord {
  constructor(
    public difficulty: string,
    public optional: { correct: number; incorrect: number; combo: number },
    public wordId?: string,
    public id?: string,
  ) {}
}
