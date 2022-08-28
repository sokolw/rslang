import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import ICard from './ICard';
import MainCardsService from './main-cards.service';

interface Member {
  avatar: string;
  name: string;
  nickName: string;
  role: string;
  description: string;
  github: string;
}

const mainMembersModel: Member[] = [
  {
    avatar: 'assets/img/avatars/sokolw-avatar.png',
    name: 'Вадим Соколов',
    nickName: 'Sokolw',
    role: 'TeamLead. Developer',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
    github: 'https://github.com/sokolw',
  },
  {
    avatar: 'assets/img/avatars/pavelZabalotny-avatar.png',
    name: 'Павел Заболотный',
    nickName: 'PavelZabalotny',
    role: 'Developer',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
    github: 'https://github.com/PavelZabalotny',
  },
  {
    avatar: 'assets/img/avatars/wex2-avatar.jpg',
    name: 'Сергей Михеенко',
    nickName: 'Wex2',
    role: 'Developer',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
    github: 'https://github.com/wex2',
  },
];

@Component({
  selector: 'app-main-page-container',
  templateUrl: './main-page-container.component.html',
  styleUrls: ['./main-page-container.component.scss'],
})
export default class MainPageContainerComponent implements OnInit, OnDestroy {
  cards: ICard[] = [];

  cardsSubscriber!: Subscription;

  members: Member[];

  constructor(private mainCardsService: MainCardsService) {
    this.members = mainMembersModel;
  }

  ngOnInit() {
    this.cardsSubscriber = this.mainCardsService.getMainCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: (error) => {
        throw new Error(error);
      },
    });
  }

  ngOnDestroy() {
    this.cardsSubscriber.unsubscribe();
  }
}
