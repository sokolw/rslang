import { Component, EventEmitter, Output, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-text-book-page-controls',
  templateUrl: './text-book-page-controls.component.html',
  styleUrls: ['./text-book-page-controls.component.scss'],
})
export default class TextBookPageControlsComponent {
  @Input() collectionSize = 0;

  @Input() page = 0;

  @Input() isLearned = false;

  @Output() pageChanged = new EventEmitter();

  getPageData(event: PageEvent) {
    this.pageChanged.emit(event);
  }
}
