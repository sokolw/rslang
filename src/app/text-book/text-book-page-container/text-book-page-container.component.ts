import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { catchError, concatMap, forkJoin, Observable, of, switchMap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import {
  REMOTE_URL_API,
  LEARNED,
  EASY,
  HARD_GROUP_VALUE,
  DEFAULT_COLLECTION_SIZE,
} from '../../core/constants/constants';
import WordsService from '../../core/services/words-service/words.service';
import Word from '../../core/services/words-service/word';
import UserWordsService from '../../core/services/user-words.service';
import TokenStorageService from '../../core/auth/token-storage.service';
import { IAggregatedWords } from '../../core/intefaces/iaggregated-words';

@Component({
  selector: 'app-text-book-page-container',
  templateUrl: './text-book-page-container.component.html',
  styleUrls: ['./text-book-page-container.component.scss'],
})
export default class TextBookPageContainerComponent implements OnInit {
  constructor(
    private wordsService: WordsService,
    private userWordsService: UserWordsService,
    private tokenStorageService: TokenStorageService,
  ) {}

  isLearned = false;

  page = this.getItem('page');

  hardPage = this.getItem('hardPage');

  group = this.getItem('group');

  words: Observable<IAggregatedWords[]> = of([]);

  isAuthorized = false;

  collectionSize: number = 0;

  ngOnInit(): void {
    if (this.group === HARD_GROUP_VALUE) {
      this.page = this.hardPage;
      this.getUserWords(this.hardPage);
    } else {
      this.getWords(this.group, this.page);
      this.collectionSize = DEFAULT_COLLECTION_SIZE;
    }
    this.checkAuthentication();
  }

  saveItem(item: number, key: string) {
    localStorage.setItem(key, item.toString());
  }

  getItem(key: string) {
    return Number(localStorage.getItem(key)) || 0;
  }

  checkAuthentication() {
    this.isAuthorized = this.tokenStorageService.getToken() !== '';
  }

  getWords(group: number, page: number) {
    this.words = this.wordsService
      .getWords(group, page)
      .pipe(
        switchMap((data) => {
          return forkJoin(
            data.map((item) => {
              return this.userWordsService.getUserWord(item.id).pipe(
                concatMap((wordResp) => {
                  const mergedWord: IAggregatedWords = {
                    ...this.updateWordURL(item),
                    userWord: {
                      difficulty: wordResp.difficulty,
                      optional: wordResp.optional,
                    },
                  };
                  return of(mergedWord);
                }),
                catchError(() => {
                  return of({ ...this.updateWordURL(item), ...this.getEmptyStatus() });
                }),
              );
            }),
          );
        }),
      )
      .pipe(
        switchMap((data) => {
          if (data !== []) {
            this.isLearned = data.every((item) => item.userWord.difficulty === LEARNED);
          }
          return of(data);
        }),
      );
  }

  getUserWords(hardPage: number) {
    this.words = this.userWordsService.aggregatedWords(hardPage).pipe(
      switchMap((data) => {
        this.collectionSize = data[0].totalCount[0]?.count;
        return of(
          data[0].paginatedResults.map((item) => {
            return {
              ...this.updateWordURL(item),
              // eslint-disable-next-line no-underscore-dangle
              id: item._id || item.id,
              userWord: {
                difficulty: item.userWord.difficulty,
                optional: {
                  correct: item.userWord.optional.correct,
                  incorrect: item.userWord.optional.incorrect,
                  combo: item.userWord.optional.combo,
                },
              },
            };
          }),
        );
      }),
    );
  }

  updateWordURL(word: IAggregatedWords | Word) {
    return {
      ...word,
      image: `${REMOTE_URL_API}/${word.image}`,
      audio: `${REMOTE_URL_API}/${word.audio}`,
      audioExample: `${REMOTE_URL_API}/${word.audioExample}`,
      audioMeaning: `${REMOTE_URL_API}/${word.audioMeaning}`,
    };
  }

  getEmptyStatus() {
    return {
      userWord: {
        difficulty: EASY,
        optional: {
          correct: 0,
          incorrect: 0,
          combo: 0,
        },
      },
    };
  }

  setLearnedPage(status: boolean) {
    this.isLearned = status;
  }

  pageChanged(event: PageEvent): void {
    this.isLearned = false;
    if (this.group === HARD_GROUP_VALUE) {
      this.hardPage = event.pageIndex;
      this.getUserWords(this.hardPage);
      this.saveItem(this.hardPage, 'hardPage');
    } else {
      this.page = event.pageIndex;
      this.getWords(this.group, this.page);
      this.saveItem(this.page, 'page');
    }
  }

  groupChanged(group: MatButtonToggleChange): void {
    this.isLearned = false;
    this.group = group.value;
    if (this.group === HARD_GROUP_VALUE) {
      this.page = 0;
      this.saveItem(this.page, 'page');
      this.getUserWords(this.hardPage);
    } else {
      this.hardPage = 0;
      this.getWords(this.group, this.page);
      this.collectionSize = DEFAULT_COLLECTION_SIZE;
    }
    this.saveItem(this.group, 'group');
  }
}
