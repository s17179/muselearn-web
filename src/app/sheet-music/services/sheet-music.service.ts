import { SheetMusic } from '../elements/sheet-music';
import { Measure } from '../elements/measure';
import { Subject } from 'rxjs';
import { Note } from '../elements/note';

export class SheetMusicService {
  sheetMusic = new Subject<SheetMusic>();

  private readonly measures: Measure[] = [];

  addMeasure(measure: Measure): void {
    this.measures.push(measure);

    this.invokeRenderingSheetMusic();
  }

  removeLastMeasure(): void {
    if (this.hasMeasures()) {
      this.measures.pop();

      this.invokeRenderingSheetMusic();
    }
  }

  addNote(note: Note): void {
    if (this.hasMeasures()) {
      const lastMeasure = this.getLastMeasure();

      lastMeasure.addNote(note);

      this.invokeRenderingSheetMusic();
    }
  }

  removeLastNote(): void {
    if (this.hasMeasures()) {
      const lastMeasure = this.getLastMeasure();

      lastMeasure.removeLastNote();

      this.invokeRenderingSheetMusic();
    }
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
