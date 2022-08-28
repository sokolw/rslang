import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import ICard from './ICard';
import MainCardsService from './main-cards.service';
import IMember from './IMember';
import MainMembersService from './main-members.service';

@Component({
  selector: 'app-main-page-container',
  templateUrl: './main-page-container.component.html',
  styleUrls: ['./main-page-container.component.scss'],
})
export default class MainPageContainerComponent implements OnInit, OnDestroy {
  cards: ICard[] = [];

  cardsSubscriber!: Subscription;

  members: IMember[] = [];

  constructor(
    private mainCardsService: MainCardsService,
    private mainMembersService: MainMembersService,
  ) {}

  ngOnInit() {
    this.cardsSubscriber = this.mainCardsService.getMainCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: (error) => {
        throw new Error(error);
      },
    });
    this.mainMembersService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }

  ngOnDestroy() {
    this.cardsSubscriber.unsubscribe();
  }
}
