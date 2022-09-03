import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { catchError, Observable, Subscription, switchMap } from 'rxjs';
import IWords from '../../core/intefaces/iwords';
import UserWordsService from '../../core/services/user-words.service';
import IUserWords from '../../core/intefaces/iuser-words';
import { IAggregatedWords } from '../../core/intefaces/iaggregated-words';
import { HARD, EASY, LEARNED, HARD_GROUP_VALUE } from '../../core/constants/constants';

@Component({
  selector: 'app-text-book-word',
  templateUrl: './text-book-word.component.html',
  styleUrls: ['./text-book-word.component.scss'],
})
export default class TextBookWordComponent implements OnDestroy {
  constructor(private userWordsService: UserWordsService) {}

  @Input() group = 0;

  @Input() words: IAggregatedWords[] | null = [];

  @Input() isAuthorized: boolean = false;

  @Output() learnedWord = new EventEmitter<boolean>();

  subscription = new Subscription();

  currentAudioId: string = '0';

  src = {
    start: '../../../assets/icons/startAudio.svg',
    stop: '../../../assets/icons/stopAudio.svg',
  };

  @ViewChildren('audioU') audioElements!: QueryList<ElementRef<HTMLAudioElement>>;

  async startAudio(word: IWords, audioU: HTMLAudioElement) {
    const audio = audioU;
    if (this.currentAudioId === word.id) {
      audio.pause();
      this.currentAudioId = '';
      return;
    }
    if (this.audioElements) {
      this.audioElements.forEach((elementRef) => {
        elementRef.nativeElement.pause();
      });
    }
    this.currentAudioId = word.id;
    const tracks = [word.audio, word.audioMeaning, word.audioExample];
    let current = 0;
    [audio.src] = tracks;
    await audio.play();
    audio.onended = () => {
      current += 1;
      if (current >= tracks.length) {
        audio.pause();
        this.currentAudioId = '';
      }
      audio.src = tracks[current];
      audio.play();
    };
  }

  updateHardWords(word: IAggregatedWords) {
    if (this.words !== null) {
      this.words = this.words.filter((item) => item.id !== word.id);
    }
  }

  checkAllLearned() {
    let learnedWords = false;
    if (this.group === HARD_GROUP_VALUE) {
      return;
    }
    if (this.words !== null) {
      learnedWords = this.words.every((word) => word.userWord.difficulty === 'learned');
    }
    if (learnedWords) {
      this.learnedWord.emit(true);
    } else {
      this.learnedWord.emit(false);
    }
  }

  createHardWord(word: IAggregatedWords, btnHard: HTMLButtonElement) {
    const btn = btnHard;
    btn.disabled = true;
    let response: IUserWords | null = null;
    this.subscription.add(
      this.userWordsService
        .getUserWord(word.id)
        .pipe(
          switchMap((data) => {
            response = data;
            if (response.difficulty === HARD) {
              this.updateWordDifficulty(word, btnHard, EASY);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${EASY}`,
              });
            }
            if (response.difficulty === LEARNED) {
              this.updateWordDifficulty(word, btnHard, HARD);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${HARD}`,
              });
            }
            if (response.difficulty !== LEARNED && response.difficulty !== HARD) {
              this.updateWordDifficulty(word, btnHard, HARD);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${HARD}`,
              });
            }
            return new Observable();
          }),
          catchError(() => {
            this.updateWordDifficulty(word, btnHard, HARD);
            return this.userWordsService.createUserWord(word.id, {
              difficulty: `${HARD}`,
              optional: {
                correct: 0,
                incorrect: 0,
                combo: 0,
              },
            });
          }),
        )
        .subscribe(),
    );
    if (this.group === HARD_GROUP_VALUE) {
      this.updateHardWords(word);
    }
  }

  createLearnedWord(word: IAggregatedWords, btnLearned: HTMLButtonElement) {
    const btn = btnLearned;
    btn.disabled = true;
    let response: IUserWords | null = null;
    this.subscription.add(
      this.userWordsService
        .getUserWord(word.id)
        .pipe(
          switchMap((data) => {
            response = data;
            if (response.difficulty === LEARNED) {
              this.updateWordDifficulty(word, btnLearned, EASY);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${EASY}`,
              });
            }
            if (response.difficulty === HARD) {
              this.updateWordDifficulty(word, btnLearned, LEARNED);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${LEARNED}`,
              });
            }
            if (response.difficulty !== LEARNED && response.difficulty !== HARD) {
              this.updateWordDifficulty(word, btnLearned, LEARNED);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${LEARNED}`,
              });
            }
            return new Observable();
          }),
          catchError(() => {
            this.updateWordDifficulty(word, btnLearned, LEARNED);
            return this.userWordsService.createUserWord(word.id, {
              difficulty: `${LEARNED}`,
              optional: {
                correct: 0,
                incorrect: 0,
                combo: 0,
              },
            });
          }),
        )
        .subscribe(),
    );
    if (this.group === HARD_GROUP_VALUE) {
      this.updateHardWords(word);
    }
  }

  updateWordDifficulty(wordData: IAggregatedWords, btn: HTMLButtonElement, difficulty: string) {
    const word = wordData;
    const wordBtn = btn;
    word.userWord.difficulty = difficulty;
    wordBtn.disabled = false;
    this.checkAllLearned();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
