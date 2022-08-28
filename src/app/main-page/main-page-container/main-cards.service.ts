import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import mainCardsModel from './mainCardsModel';
import ICard from './ICard';

@Injectable({
  providedIn: 'root',
})
export default class MainCardsService {
  getMainCards(): Observable<ICard[]> {
    return new Observable((sub) => {
      if (!mainCardsModel.length) {
        sub.error('Main cards is empty');
      }
      sub.next(mainCardsModel);
    });
  }
}
