import { SheetMusic } from '../elements/sheet-music';
import { Measure } from '../elements/measure';
import { Subject } from 'rxjs';

export class SheetMusicService {
  sheetMusic = new Subject<SheetMusic>();

  private readonly measures: Measure[] = [];

  addMeasure(measure: Measure): void {
    this.measures.push(measure);

    this.invokeRenderingSheetMusic();
  }

  removeLastMeasure(): void {
    if (this.measures.length > 0) {
      this.measures.pop();

      this.invokeRenderingSheetMusic();
    }
  }

  private invokeRenderingSheetMusic(): void {
    this.sheetMusic.next(new SheetMusic(this.measures));
  }
}
