import { Component, OnInit } from '@angular/core';
import GameSprintService from '../../core/services/game-sprint-service/game-sprint.service';

@Component({
  selector: 'app-game-sprint-container',
  templateUrl: './game-sprint-container.component.html',
  styleUrls: ['./game-sprint-container.component.scss'],
})
export default class GameSprintContainerComponent implements OnInit {
  constructor(private gameSprintService: GameSprintService) {}

  ngOnInit(): void {
    console.log('GameSprintContainerComponent');
    this.gameSprintService.start(0, 0).subscribe((data) => {
      console.log(data);
      this.gameSprintService.checkAnswer(true);
      console.log(this.gameSprintService.getNextGameData());
      this.gameSprintService.checkAnswer(true);
      console.log(this.gameSprintService.getNextGameData());
      this.gameSprintService.checkAnswer(true);
      console.log(this.gameSprintService.getNextGameData());
      this.gameSprintService.checkAnswer(true);
    }); // test questions
  }
}
