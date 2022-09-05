import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import IAudioQuestion from '../../core/services/game-audio-call-service/interfaces/iaudio-question';
import GameAudioCallService from '../../core/services/game-audio-call-service/game-audio-call.service';

@Component({
  selector: 'app-game-audio-call-container',
  templateUrl: './game-audio-call-container.component.html',
  styleUrls: ['./game-audio-call-container.component.scss'],
})
export default class GameAudioCallContainerComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  isLevelSelected = false;

  isLoading = false;

  isReadyData = false;

  isEndGame = false;

  currentQuestion: IAudioQuestion = { question: '', answers: [] };

  constructor(
    private gameAudioCallService: GameAudioCallService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query) => {
      if (Object.keys(query).length !== 0) {
        const params = { group: 0, page: 0, ...query };
        this.prepareGame(+params.group, +params.page);
      }
    });
  }

  ngOnDestroy(): void {
    this.gameAudioCallService.clearInstance();
    this.subscription.unsubscribe();
  }

  prepareGame(group: number, page?: number) {
    this.isLevelSelected = true;
    this.isLoading = true;
    this.subscription = this.gameAudioCallService.start(group, page).subscribe((firstQuestion) => {
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

  checkAnswer(id: number) {
    this.gameAudioCallService.checkAnswer(id);
  }
}
