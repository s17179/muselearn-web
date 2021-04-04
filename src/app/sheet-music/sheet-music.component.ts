import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Measure } from './elements/measure';
import { ClefType } from './elements/clef-type';
import { TimeSignature } from './elements/time-signature';
import { Note } from './elements/note';
import { NoteType } from './elements/note-type';
import { Octave } from './elements/octave';
import { NoteDuration } from './elements/note-duration';
import { SheetMusicService } from './services/sheet-music.service';
import { Subscription } from 'rxjs';
import { SheetMusicRenderer } from './services/sheet-music-renderer';
import { SheetMusic } from './elements/sheet-music';

@Component({
  selector: 'app-sheet-music',
  templateUrl: './sheet-music.component.html',
  styleUrls: ['./sheet-music.component.css'],
})
export class SheetMusicComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sheetMusic') sheetMusicElementRef!: ElementRef;

  private sheetMusicSubscription!: Subscription;

  constructor(
    private readonly sheetMusicService: SheetMusicService,
    private readonly sheetMusicRenderer: SheetMusicRenderer,
  ) {}

  ngAfterViewInit(): void {
    this.sheetMusicSubscription = this.sheetMusicService.sheetMusic.subscribe(
      (sheetMusic: SheetMusic) =>
        this.sheetMusicRenderer.render(
          sheetMusic,
          this.sheetMusicElementRef.nativeElement,
        ),
    );
  }

  ngOnDestroy(): void {
    this.sheetMusicSubscription.unsubscribe();
  }

  // private static getTestMeasure(): Measure {
  //   return new Measure(
  //     ClefType.Treble,
  //     new TimeSignature(4, NoteDuration.QuarterNote),
  //     [
  //       new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
  //       new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
  //       new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
  //       new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
  //     ],
  //   );
  // }
}
