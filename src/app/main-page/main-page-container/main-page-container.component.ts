import { Component } from '@angular/core';

interface Card {
  title: string;
  description: string;
  img: string;
}

interface Member {
  avatar: string;
  name: string;
  nickName: string;
  role: string;
  description: string;
  github: string;
}

const mainCardsModel: Card[] = [
  {
    title: 'Демо-режим',
    description: 'Попробуйте возможности нашего приложения без регистрации',
    img: 'assets/img/cards/show-card-1.png',
  },
  {
    title: 'Простой интерфейс',
    description: 'В пару кликов легко перейти в учебник, поиграть, посмотреть статистику',
    img: 'assets/img/cards/show-card-2.png',
  },
  {
    title: 'Учебник',
    description: 'Уникальная подборка слов по уровням сложности',
    img: 'assets/img/cards/show-card-3.png',
  },
  {
    title: 'Игры',
    description: 'Две игры на  запоминание слов: "Аудиовызов" и "Спринт"',
    img: 'assets/img/cards/show-card-4.png',
  },
  {
    title: 'Заметки',
    description:
      'После регистрации будет дооступен раздел "Сложные слова". Если не можешь запомнить слово, добавь его в заметки и вернись к нему позже',
    img: 'assets/img/cards/show-card-5.png',
  },
  {
    title: 'Статистика',
    description:
      'Отслеживай свои достижения в статистике. Так же она поможет определить каким словам необходимо уделить больше внимания',
    img: 'assets/img/cards/show-card-6.png',
  },
];
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
export default class MainPageContainerComponent {
  cards: Card[];

  members: Member[];

  constructor() {
    this.cards = mainCardsModel;
    this.members = mainMembersModel;
  }
}
