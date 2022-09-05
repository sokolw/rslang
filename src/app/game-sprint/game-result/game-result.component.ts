import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import Word from '../../core/services/words-service/word';
import { EMPTY_GAME_RESULT } from '../game-sprint-container/game-sprint-container.component';
import IGameResult from '../../core/services/game-audio-call-service/interfaces/igame-result';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export default class GameResultComponent {
  constructor(private router: Router) {}

  @Input() gameResult: IGameResult = EMPTY_GAME_RESULT;

  @Output() restart: EventEmitter<boolean> = new EventEmitter<boolean>();

  callAudio(word: Word) {
    const audio = new Audio();
    audio.src = word.audio;
    audio.load();
    audio.play();
  }

  redirectToMain() {
    this.router.navigate(['/']);
  }

  restartGame() {
    this.restart.emit(true);
  }
}
