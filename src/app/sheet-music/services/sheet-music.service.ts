import { SheetMusic } from '../elements/sheet-music';
import { Measure } from '../elements/measure';
import { Subject } from 'rxjs';
import { Note } from '../elements/note';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { NoteDurationMapper } from './note-duration.mapper';
import { SheetMusicEvent } from '../events/sheet-music.event';

@Injectable()
export class SheetMusicService {
  sheetMusic = new Subject<SheetMusic>();
  sheetMusicEventStream = new Subject<SheetMusicEvent>();
  private measures: Measure[] = [];

  constructor(private readonly httpClient: HttpClient) {}

  addMeasure(measure: Measure, save = false): void {
    if (save) {
      this.httpClient
        .post<null>('http://localhost:3000/sheet-music/measure', {
          id: measure.id,
          clefType: measure.getClefType().toString(),
          beatsInMeasure: measure.getTimeSignature().beatsInMeasure,
          noteDuration: NoteDurationMapper.mapToMathValue(
            measure.getTimeSignature().noteDuration.valueOf(),
          ),
        })
        .subscribe(() => {
          this.measures.push(measure);

          this.invokeRenderingSheetMusic();

          this.sheetMusicEventStream.next(
            new SheetMusicEvent('MeasureCreated'),
          );
        });
    } else {
      this.measures.push(measure);

      this.invokeRenderingSheetMusic();
    }
  }

  removeLastMeasure(save = false): void {
    if (this.hasMeasures()) {
      const lastMeasure = this.getLastMeasure();

      if (save) {
        this.httpClient
          .request('delete', 'http://localhost:3000/sheet-music/measure', {
            body: { id: lastMeasure.id },
          })
          .subscribe(() => {
            this.measures.pop();

            this.invokeRenderingSheetMusic();

            this.sheetMusicEventStream.next(
              new SheetMusicEvent('MeasureDeleted'),
            );
          });
      } else {
        this.measures.pop();

        this.invokeRenderingSheetMusic();
      }
    }
  }

  addNote(note: Note, save = false): void {
    if (this.hasMeasures()) {
      const lastMeasure = this.getLastMeasure();

      if (save) {
        this.httpClient
          .post<null>('http://localhost:3000/sheet-music/measure/note', {
            id: note.id,
            measureId: lastMeasure.id,
            noteDuration: NoteDurationMapper.mapToMathValue(
              note.getNoteDuration().valueOf(),
            ),
          })
          .subscribe(() => {
            lastMeasure.addNote(note);

            this.invokeRenderingSheetMusic();

            this.sheetMusicEventStream.next(
              new SheetMusicEvent('NoteAddedToMeasure'),
            );
          });
      } else {
        lastMeasure.addNote(note);

        this.invokeRenderingSheetMusic();
      }
    }
  }

  removeLastNote(save = false): void {
    if (this.hasMeasures()) {
      const lastMeasure = this.getLastMeasure();

      const lastNote = lastMeasure.getLastNote();

      if (save) {
        this.httpClient
          .request<null>(
            'delete',
            'http://localhost:3000/sheet-music/measure/note',
            {
              body: {
                id: lastNote.id,
                measureId: lastMeasure.id,
              },
            },
          )
          .subscribe(() => {
            lastMeasure.removeLastNote();

            this.invokeRenderingSheetMusic();

            this.sheetMusicEventStream.next(
              new SheetMusicEvent('NoteRemovedFromMeasure'),
            );
          });
      } else {
        lastMeasure.removeLastNote();

        this.invokeRenderingSheetMusic();
      }
    }
  }

  clear(): void {
    this.measures = [];

    this.invokeRenderingSheetMusic();
  }

  private getLastMeasure(): Measure {
    return this.measures[this.measures.length - 1];
  }

  private hasMeasures(): boolean {
    return this.measures.length > 0;
  }

  private invokeRenderingSheetMusic(): void {
    this.sheetMusic.next(new SheetMusic(this.measures));
  }
}
