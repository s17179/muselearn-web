import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Measure } from './elements/measure';
import { ClefType } from './elements/clef-type';
import { TimeSignature } from './elements/time-signature';
import { Note } from './elements/note';
import { NoteType } from './elements/note-type';
import { Octave } from './elements/octave';
import { NoteDuration } from './elements/note-duration';
import { SheetMusicService } from './services/sheet-music.service';

@Component({
  selector: 'app-sheet-music',
  templateUrl: './sheet-music.component.html',
  styleUrls: ['./sheet-music.component.css'],
})
export class SheetMusicComponent implements AfterViewInit {
  @ViewChild('sheetMusic') sheetMusicElementRef!: ElementRef;

  constructor(private readonly sheetMusic: SheetMusicService) {}

  ngAfterViewInit(): void {
    this.sheetMusic.addMeasure(SheetMusicComponent.getTestMeasure());
    this.sheetMusic.addMeasure(SheetMusicComponent.getTestMeasure());
    this.sheetMusic.addMeasure(SheetMusicComponent.getTestMeasure());
    this.sheetMusic.addMeasure(SheetMusicComponent.getTestMeasure());
    this.sheetMusic.addMeasure(
      new Measure(
        ClefType.Bass,
        new TimeSignature(3, NoteDuration.QuarterNote),
        [
          new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
          new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
          new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
        ],
      ),
    );
    this.sheetMusic.addMeasure(SheetMusicComponent.getTestMeasure());
    this.sheetMusic.addMeasure(SheetMusicComponent.getTestMeasure());

    this.sheetMusic.render(this.sheetMusicElementRef.nativeElement);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private static getTestMeasure(): Measure {
    return new Measure(
      ClefType.Treble,
      new TimeSignature(4, NoteDuration.QuarterNote),
      [
        new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
        new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
        new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
        new Note(NoteType.D, Octave.Four, NoteDuration.QuarterNote),
      ],
    );
  }
}
