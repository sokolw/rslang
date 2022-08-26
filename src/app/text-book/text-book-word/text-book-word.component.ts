import { Component, OnInit, Input } from '@angular/core';
import IWords from '../../core/intefaces/IWords';

@Component({
  selector: 'app-text-book-word',
  templateUrl: './text-book-word.component.html',
  styleUrls: ['./text-book-word.component.scss'],
})
export default class TextBookWordComponent implements OnInit {
  @Input() words: IWords[] = [];

  ngOnInit(): void {}
}
