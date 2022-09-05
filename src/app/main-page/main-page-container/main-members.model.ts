import IMember from './IMember';

const mainMembersModel: IMember[] = [
  {
    avatar: 'assets/img/avatars/sokolw-avatar.png',
    name: 'Вадим Соколов',
    nickName: 'Sokolw',
    role: 'TeamLead. Developer',
    description:
      'Настройка окружения для разработки. Дизайн главной страницы, авторизации, игры аудиовызов, статистики. Реализация авторизации, header, игры аудиовызов, спринт, статистика.',
    github: 'https://github.com/sokolw',
  },
  {
    avatar: 'assets/img/avatars/pavelZabalotny-avatar.png',
    name: 'Павел Заболотный',
    nickName: 'PavelZabalotny',
    role: 'Developer',
    description:
      'Дизайн главной страницы, игры спринт. Реализация main, footer, верстка и таймер для игры спринт.',
    github: 'https://github.com/PavelZabalotny',
  },
  {
    avatar: 'assets/img/avatars/wex2-avatar.png',
    name: 'Сергей Михеенко',
    nickName: 'Wex2',
    role: 'Developer',
    description: 'Дизайн учебника. Реализация учебника, header adaptive.',
    github: 'https://github.com/wex2',
  },
];

export default mainMembersModel;
