import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import TextBookPageContainerComponent from './text-book-page-container/text-book-page-container.component';

@NgModule({
  declarations: [TextBookPageContainerComponent],
  imports: [CommonModule],
  exports: [TextBookPageContainerComponent],
})
export default class TextBookModule {}
