import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import mainMembersModel from './main-members.model';
import IMember from './IMember';

@Injectable({
  providedIn: 'root',
})
export default class MainMembersService {
  getMembers(): Observable<IMember[]> {
    return of(mainMembersModel);
  }
}
