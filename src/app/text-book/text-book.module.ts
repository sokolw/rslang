import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import TextBookPageContainerComponent from './text-book-page-container/text-book-page-container.component';
import TextBookGroupControlsComponent from './text-book-group-controls/text-book-group-controls.component';

@NgModule({
  declarations: [TextBookPageContainerComponent, TextBookGroupControlsComponent],
  imports: [CommonModule],
  exports: [TextBookPageContainerComponent],
})
export default class TextBookModule {}
