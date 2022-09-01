import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import IAudioQuestion from '../../core/services/game-audio-call-service/interfaces/iaudio-question';
import GameAudioCallService from '../../core/services/game-audio-call-service/game-audio-call.service';

@Component({
  selector: 'app-game-audio-call-container',
  templateUrl: './game-audio-call-container.component.html',
  styleUrls: ['./game-audio-call-container.component.scss'],
})
export default class GameAudioCallContainerComponent implements OnDestroy {
  // TODO: wait interface from text-book use ActivatedRoute for check query in OnInit
  // TODO: import { Router, ActivatedRoute, ParamMap } from '@angular/router';

  subscription = new Subscription();

  isLevelSelected = false;

  isLoading = false;

  isReadyData = false;

  isEndGame = false;

  currentQuestion: IAudioQuestion = { question: '', answers: [] };

  constructor(private gameAudioCallService: GameAudioCallService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  prepareGame(group: number) {
    this.isLevelSelected = true;
    this.isLoading = true;
    this.subscription = this.gameAudioCallService.start(group).subscribe((firstQuestion) => {
      if (firstQuestion) {
        this.currentQuestion = firstQuestion;
        this.isLoading = false;
        this.isReadyData = true;
      }
    });
  }

  getNextQuestion() {
    const tempQuestion = this.gameAudioCallService.getNextQuestion();
    if (tempQuestion) {
      this.currentQuestion = tempQuestion;
    } else {
      this.displayResults();
    }
  }

  displayResults() {
    this.isEndGame = true;
  }

  restartGame() {
    this.gameAudioCallService.restart();
    this.getNextQuestion();
    this.isEndGame = false;
  }
}
