import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import GameSprintService from '../../core/services/game-sprint-service/game-sprint.service';
import IGamePartialData from '../../core/services/game-sprint-service/interfaces/igame-partial-data';
import IGameResult from '../../core/services/game-audio-call-service/interfaces/igame-result';

export const EMPTY_GAME_PARTIAL_DATA = {
  question: {
    word: '',
    questionWord: '',
    answer: false,
  },
  streakStats: {
    streak: 0,
    streakPoints: 0,
  },
  points: 0,
};

export const EMPTY_GAME_RESULT = {
  totalCorrect: 0,
  totalIncorrect: 0,
  totalPoints: 0,
  totalExperience: 0,
  wordsWithStatus: [],
};

@Component({
  selector: 'app-game-sprint-container',
  templateUrl: './game-sprint-container.component.html',
  styleUrls: ['./game-sprint-container.component.scss'],
})
export class GameSprintContainerComponent implements OnInit, OnDestroy {
  constructor(
    private gameSprintService: GameSprintService,
    private activatedRoute: ActivatedRoute,
  ) {}

  subscription = new Subscription();

  subscriptionGameResult = new Subscription();

  isLevelSelected = false;

  isLoading = false;

  isReadyData = false;

  isEndGame = false;

  currentQuestion: IGamePartialData = EMPTY_GAME_PARTIAL_DATA;

  gameResult: IGameResult = EMPTY_GAME_RESULT;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query) => {
      if (Object.keys(query).length !== 0) {
        const params = { group: 0, page: 0, ...query };
        this.prepareGame(+params.group, +params.page);
      }
    });
  }

  ngOnDestroy(): void {
    this.gameSprintService.clearInstance();
    this.subscription.unsubscribe();
    this.subscriptionGameResult.unsubscribe();
  }

  prepareGame(group: number, page?: number) {
    this.isLevelSelected = true;
    this.isLoading = true;
    this.subscription = this.gameSprintService.start(group, page).subscribe((firstQuestion) => {
      if (firstQuestion) {
        this.currentQuestion = firstQuestion;
        this.isLoading = false;
        this.isReadyData = true;
      }
    });
  }

  checkAnswer(answer: boolean) {
    this.gameSprintService.checkAnswer(answer);
    this.getNextQuestion();
  }

  getNextQuestion() {
    const tempQuestion = this.gameSprintService.getNextGameData();
    if (tempQuestion) {
      this.currentQuestion = tempQuestion;
    } else {
      this.displayResults();
    }
  }

  displayResults() {
    this.isEndGame = true;
    this.isLoading = true;
    this.subscriptionGameResult = this.gameSprintService.getGameResult().subscribe((result) => {
      this.gameResult = result;
      this.isLoading = false;
    });
  }

  restartGame() {
    this.gameSprintService.restart();
    this.getNextQuestion();
    this.isEndGame = false;
  }
}
