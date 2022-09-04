import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GAME_AUDIO_CALL, GAME_SPRINT } from './core/constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  title = 'rslang';

  disableFooterInRoutes = [GAME_AUDIO_CALL, GAME_SPRINT];

  constructor(private router: Router) {}

  hasRoute(routes: string[]) {
    return routes.some((route) => new RegExp(route).test(this.router.url));
  }
}
