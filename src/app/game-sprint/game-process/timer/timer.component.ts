import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export default class TimerComponent implements OnInit, OnDestroy {
  timeLimit = 60;

  timeLeft = this.timeLimit;

  timerInterval = 0;

  fullDashArray = 280;

  firstDashArray = this.fullDashArray;

  circleDashArray: string = '';

  strokeColor = '#6200ea';

  @Output() timeEnd = new EventEmitter();

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.timeLimit;
    return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    this.firstDashArray = this.calculateTimeFraction() * this.fullDashArray;
    this.circleDashArray = `${this.firstDashArray.toFixed(0)} ${this.fullDashArray}`;
  }

  ngOnInit() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft === 0) {
        clearInterval(this.timerInterval);
        this.timeEnd.emit();
        return;
      }
      if (this.timeLeft === 11) {
        this.strokeColor = 'red';
      }
      this.timeLeft -= 1;
      this.setCircleDasharray();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }
}
