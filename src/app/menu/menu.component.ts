import { Component } from '@angular/core';
import { NewMeasureComponent } from './new-measure/new-measure.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { SheetMusicService } from '../sheet-music/services/sheet-music.service';
import { Measure } from '../sheet-music/elements/measure';
import { TimeSignature } from '../sheet-music/elements/time-signature';
import { Note } from '../sheet-music/elements/note';
import { NoteType } from '../sheet-music/elements/note-type';
import { Octave } from '../sheet-music/elements/octave';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(
    private readonly dialog: MatDialog,
    private readonly sheetMusicService: SheetMusicService,
  ) {}

  openNewMeasureDialog(): void {
    const newMeasureDialog = this.dialog.open(NewMeasureComponent);

    newMeasureDialog.afterClosed().subscribe((form?: FormGroup) => {
      if (form && form.valid) {
        const clefType = form.value.clef;

        const timeSignature = TimeSignature.fromString(
          form.value.timeSignature,
        );

        this.sheetMusicService.addMeasure(new Measure(clefType, timeSignature));
      }
    });
  }

  onRemoveLastMeasure(): void {
    this.sheetMusicService.removeLastMeasure();
  }

  onAddNote(noteDuration: number): void {
    this.sheetMusicService.addNote(
      new Note(NoteType.D, Octave.Four, noteDuration),
    );
  }

  onRemoveLastNote(): void {
    this.sheetMusicService.removeLastNote();
  }
}
