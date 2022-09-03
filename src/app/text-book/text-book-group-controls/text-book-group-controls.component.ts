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

  groupsStyles = ['group-1', 'group-2', 'group-3', 'group-4', 'group-5', 'group-6'];

  getPaginatorData(event: MatButtonToggleChange) {
    this.groupChanged.emit(event);
  }
}
