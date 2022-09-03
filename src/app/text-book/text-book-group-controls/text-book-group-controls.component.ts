import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-text-book-group-controls',
  templateUrl: './text-book-group-controls.component.html',
  styleUrls: ['./text-book-group-controls.component.scss'],
})
export default class TextBookGroupControlsComponent {
  @Input() isAuthorized: boolean = false;

  @Output() groupChanged = new EventEmitter<MatButtonToggleChange>();

  groupsStyles = ['group1', 'group2', 'group3', 'group4', 'group5', 'group6'];

  getPaginatorData(event: MatButtonToggleChange) {
    this.groupChanged.emit(event);
  }
}
