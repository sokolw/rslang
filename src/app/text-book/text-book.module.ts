import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import TextBookPageContainerComponent from './text-book-page-container/text-book-page-container.component';
import TextBookGroupControlsComponent from './text-book-group-controls/text-book-group-controls.component';
import TextBookPageControlsComponent from './text-book-page-controls/text-book-page-controls.component';
import TextBookWordComponent from './text-book-word/text-book-word.component';

@NgModule({
  declarations: [
    TextBookPageContainerComponent,
    TextBookGroupControlsComponent,
    TextBookPageControlsComponent,
    TextBookWordComponent,
  ],
  imports: [CommonModule, MatPaginatorModule, MatButtonToggleModule, NgbPaginationModule],
  exports: [TextBookPageContainerComponent],
})
export default class TextBookModule {}
