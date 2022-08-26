import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-text-book-group-controls',
  templateUrl: './text-book-group-controls.component.html',
  styleUrls: ['./text-book-group-controls.component.scss'],
})
export default class TextBookGroupControlsComponent implements OnInit {
  @Output() groupChanged = new EventEmitter<MatButtonToggleChange>();

  groupsStyles = ['#e0e0e0', '#64b5f6', '#81c784', '#fff176', '#de7553', '#e57373', '#e33434'];

  getPaginatorData(event: MatButtonToggleChange) {
    this.groupChanged.emit(event);
    console.log(event);
  }

  ngOnInit(): void {}
}
