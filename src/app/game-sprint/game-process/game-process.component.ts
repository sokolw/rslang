import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

function isEmptyObject(obj: Object): boolean {
  return Object.keys(obj).length === 0;
}

@Component({
  selector: 'app-game-process',
  templateUrl: './game-process.component.html',
  styleUrls: ['./game-process.component.scss'],
})
export default class GameProcessComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('GameProcessComponent');
    this.router.queryParams.subscribe((params) => {
      console.log('isEmpty', isEmptyObject(params));
    });
  }
}
