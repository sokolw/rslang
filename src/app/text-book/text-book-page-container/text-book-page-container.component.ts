import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { REMOTE_URL_API } from '../../core/constants/constants';
import TextBookService from '../../core/services/text-book.service';
import IWords from '../../core/intefaces/IWords';

@Component({
  selector: 'app-text-book-page-container',
  templateUrl: './text-book-page-container.component.html',
  styleUrls: ['./text-book-page-container.component.scss'],
})
export default class TextBookPageContainerComponent implements OnInit {
  page: number = 0;

  group: number = 0;

  words: IWords[] = [];

  constructor(private textBookService: TextBookService) {}

  getWords(group: number, page: number) {
    this.textBookService.getWords(group, page).subscribe((data) => {
      this.words = data.map((item) => {
        return {
          ...item,
          image: `${REMOTE_URL_API}/${item.image}`,
          audio: `${REMOTE_URL_API}/${item.audio}`,
          audioExample: `${REMOTE_URL_API}/${item.audioExample}`,
          audioMeaning: `${REMOTE_URL_API}/${item.audioMeaning}`,
        };
      });
      console.log(this.words);
    });
  }

  pageChanged(page: PageEvent): void {
    this.page = page.pageIndex;
    this.getWords(this.group, this.page);
  }

  groupChanged(group: MatButtonToggleChange): void {
    this.group = group.value;
    this.getWords(this.group, this.page);
  }

  ngOnInit(): void {
    this.getWords(this.group, this.page);
  }
}
