import IAudioQuestion from 'src/app/core/services/game-audio-call-service/interfaces/iaudio-question';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import IAnswer from 'src/app/core/services/game-audio-call-service/interfaces/ianswer';

const NUMBER_BUTTONS = ['1', '2', '3', '4', '5'];
const CONTROL_BUTTONS = ['Enter', ' '];

@Component({
  selector: 'app-audio-call-question',
  templateUrl: './audio-call-question.component.html',
  styleUrls: ['./audio-call-question.component.scss'],
})
export default class AudioCallQuestionComponent implements OnInit, OnChanges, OnDestroy {
  @Input() audioQuestion: IAudioQuestion = { question: '', answers: [] };

  @Output() nextQuestionEvent: EventEmitter<null> = new EventEmitter<null>();

  @Output() answerIdEvent: EventEmitter<number> = new EventEmitter<number>();

  isAnswered = false;

  answerId = -1;

  mapButtons = new Map<string, () => void>();

  buttonsHandlerCallBack: (event: Event) => void = () => {};

  ngOnChanges(): void {
    this.isAnswered = false;
    this.answerId = -1;
    this.callAudio();
  }

  ngOnInit(): void {
    this.createMapButtons();
    this.buttonsHandlerCallBack = this.buttonsHandler.bind(this);
    document.addEventListener('keypress', this.buttonsHandlerCallBack);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keypress', this.buttonsHandlerCallBack);
  }

  buttonsHandler(event: Event) {
    if (event instanceof KeyboardEvent) {
      const { key } = event;
      if (this.mapButtons.has(key)) {
        (this.mapButtons.get(key) as () => void)();
      }
    }
  }

  createMapButtons() {
    NUMBER_BUTTONS.forEach((item, index) => {
      this.mapButtons.set(
        item,
        (() => {
          return () => {
            if (!this.isAnswered) {
              this.setAnswerByKeyboard(index);
            }
          };
        })(),
      );
    });
    CONTROL_BUTTONS.forEach((item) => {
      this.mapButtons.set(
        item,
        (() => {
          return () => {
            if (!this.isAnswered) {
              this.skipQuestion();
            } else {
              this.nextQuestion();
            }
          };
        })(),
      );
    });
  }

  callAudio() {
    const audio = new Audio();
    audio.src = this.audioQuestion.question;
    audio.load();
    audio.play();
  }

  setAnswer(answer: IAnswer) {
    this.answerId = this.audioQuestion.answers.indexOf(answer);
    this.answerIdEvent.emit(this.answerId);
    this.isAnswered = true;
  }

  setAnswerByKeyboard(id: number) {
    this.answerId = id;
    this.answerIdEvent.emit(this.answerId);
    this.isAnswered = true;
  }

  skipQuestion() {
    this.answerIdEvent.emit(this.answerId);
    this.isAnswered = true;
  }

  nextQuestion() {
    this.nextQuestionEvent.emit(null);
  }

  clearButtonFocus(button: HTMLElement) {
    button.blur();
  }
}
