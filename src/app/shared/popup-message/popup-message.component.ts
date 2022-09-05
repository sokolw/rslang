import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CLOSE } from '../constants/constants';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss'],
})
export default class PopupMessageComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() message = '';

  @Output() typeOfAuthShown: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('PopupMessageComponent');
  }

  closePopup(event: Event) {
    const overlayElem = event.target as HTMLElement;
    const buttonElem = event.currentTarget as HTMLElement;
    if (buttonElem.className === 'button__close' || overlayElem.className === 'overlay') {
      this.typeOfAuthShown.emit(CLOSE);
    }
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const currentUrl = `${this.router.url}?`;
    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }
}
