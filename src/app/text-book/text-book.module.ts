import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule],
  exports: [TextBookPageContainerComponent],
})
export default class TextBookModule {}
