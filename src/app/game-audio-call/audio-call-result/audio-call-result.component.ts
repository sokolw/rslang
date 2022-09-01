import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import Word from 'src/app/core/services/words-service/word';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import GameAudioCallService from 'src/app/core/services/game-audio-call-service/game-audio-call.service';
import IGameResult from 'src/app/core/services/game-audio-call-service/interfaces/igame-result';

@Component({
  selector: 'app-audio-call-result',
  templateUrl: './audio-call-result.component.html',
  styleUrls: ['./audio-call-result.component.scss'],
})
export default class AudioCallResultComponent implements OnInit, OnDestroy {
  constructor(private gameAudioCallService: GameAudioCallService, private router: Router) {}

  subscription = new Subscription();

  @Output() restartEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  gameResult: IGameResult = {
    totalCorrect: 0,
    totalIncorrect: 0,
    totalPoints: 0,
    totalExperience: 0,
    wordsWithStatus: [],
  };

  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.gameAudioCallService.getGameResult().subscribe((result) => {
      this.gameResult = result;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  callAudio(word: Word) {
    const audio = new Audio();
    audio.src = word.audio;
    audio.load();
    audio.play();
  }

  redirectToMain() {
    this.gameAudioCallService.clearInstance();
    this.router.navigate(['/']);
  }

  restartGame() {
    this.restartEvent.emit(true);
  }
}
