import IAnswer from './ianswer';

export default interface IAudioQuestion {
  question: string;
  answers: Array<IAnswer>;
}
