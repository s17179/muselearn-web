import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewMeasureComponent } from './new-measure/new-measure.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { SheetMusicService } from '../sheet-music/services/sheet-music.service';
import { Measure } from '../sheet-music/elements/measure';
import { TimeSignature } from '../sheet-music/elements/time-signature';
import { Note } from '../sheet-music/elements/note';
import { EventLogService } from '../event-log/event-log.service';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  isCurrentStateActive = true;
  private sub!: Subscription;

  constructor(
    private readonly dialog: MatDialog,
    private readonly sheetMusicService: SheetMusicService,
    private readonly eventLogService: EventLogService,
  ) {}

  ngOnInit(): void {
    this.sub = this.eventLogService.isCurrentStateActive.subscribe(
      (value) => (this.isCurrentStateActive = value),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openNewMeasureDialog(): void {
    const newMeasureDialog = this.dialog.open(NewMeasureComponent);

    newMeasureDialog.afterClosed().subscribe((form?: FormGroup) => {
      if (form && form.valid) {
        const clefType = form.value.clef;

        const timeSignature = TimeSignature.fromString(
          form.value.timeSignature,
        );

        this.sheetMusicService.addMeasure(
          new Measure(uuidv4(), clefType, timeSignature),
          true,
        );
      }
    });
  }

  onRemoveLastMeasure(): void {
    this.sheetMusicService.removeLastMeasure(true);
  }

  onAddNote(noteDuration: number): void {
    this.sheetMusicService.addNote(new Note(uuidv4(), noteDuration), true);
  }

  onRemoveLastNote(): void {
    this.sheetMusicService.removeLastNote(true);
  }
}
