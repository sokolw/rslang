import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import IGamePartialData from '../../core/services/game-sprint-service/interfaces/igame-partial-data';
import { EMPTY_GAME_PARTIAL_DATA } from '../game-sprint-container/game-sprint-container.component';

@Component({
  selector: 'app-game-process',
  templateUrl: './game-process.component.html',
  styleUrls: ['./game-process.component.scss'],
})
export default class GameProcessComponent implements OnInit, OnDestroy {
  @Input() question: IGamePartialData = EMPTY_GAME_PARTIAL_DATA;

  @Output() answer = new EventEmitter<boolean>();

  @Output() endGameEvent = new EventEmitter();

  mapButtons = new Map<string, () => void>([
    [
      'ArrowLeft',
      () => {
        const negative = false;
        this.setAnswer(negative);
      },
    ],
    [
      'ArrowRight',
      () => {
        const positive = true;
        this.setAnswer(positive);
      },
    ],
  ]);

  buttonsHandlerCallBack: (event: Event) => void = () => {};

  ngOnInit(): void {
    this.buttonsHandlerCallBack = this.buttonsHandler.bind(this);
    document.addEventListener('keydown', this.buttonsHandlerCallBack);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.buttonsHandlerCallBack);
  }

  setAnswer(answer: boolean) {
    this.answer.emit(answer);
  }

  endGame() {
    this.endGameEvent.emit();
  }

  buttonsHandler(event: Event) {
    if (event instanceof KeyboardEvent) {
      const { key } = event;
      if (this.mapButtons.has(key)) {
        (this.mapButtons.get(key) as () => void)();
      }
    }
  }
}
