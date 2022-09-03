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

const DIFFICULTY_HARD = 'hard';

const DIFFICULTY_NONE = 'none';

const DIFFICULTY_LEARNED = 'learned';

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
    if (this.group === 6) {
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
            if (response.difficulty === DIFFICULTY_HARD) {
              this.updateWordDifficulty(word, btnHard, DIFFICULTY_NONE);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${DIFFICULTY_NONE}`,
              });
            }
            if (response.difficulty === DIFFICULTY_LEARNED) {
              this.updateWordDifficulty(word, btnHard, DIFFICULTY_HARD);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${DIFFICULTY_HARD}`,
              });
            }
            if (response.difficulty === DIFFICULTY_NONE) {
              this.updateWordDifficulty(word, btnHard, DIFFICULTY_HARD);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${DIFFICULTY_HARD}`,
              });
            }
            return new Observable();
          }),
          catchError(() => {
            this.updateWordDifficulty(word, btnHard, DIFFICULTY_HARD);
            return this.userWordsService.createUserWord(word.id, {
              difficulty: `${DIFFICULTY_HARD}`,
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
    if (this.group === 6) {
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
            if (response.difficulty === DIFFICULTY_LEARNED) {
              this.updateWordDifficulty(word, btnLearned, DIFFICULTY_NONE);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${DIFFICULTY_NONE}`,
              });
            }
            if (response.difficulty === DIFFICULTY_HARD) {
              this.updateWordDifficulty(word, btnLearned, DIFFICULTY_LEARNED);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${DIFFICULTY_LEARNED}`,
              });
            }
            if (response.difficulty === DIFFICULTY_NONE) {
              this.updateWordDifficulty(word, btnLearned, DIFFICULTY_LEARNED);
              return this.userWordsService.updateUserWord(word.id, {
                difficulty: `${DIFFICULTY_LEARNED}`,
              });
            }
            return new Observable();
          }),
          catchError(() => {
            this.updateWordDifficulty(word, btnLearned, DIFFICULTY_LEARNED);
            return this.userWordsService.createUserWord(word.id, {
              difficulty: `${DIFFICULTY_LEARNED}`,
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
    if (this.group === 6) {
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
