import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  title = 'rslang';

  disableFooterInRoutes = ['game-audio-call', 'game-sprint'];

  constructor(private router: Router) {}

  hasRoute(routes: string[]) {
    return routes.some((route) => new RegExp(route).test(this.router.url));
  }
}
