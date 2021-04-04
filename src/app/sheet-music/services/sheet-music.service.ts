import { SheetMusic } from '../elements/sheet-music';
import { Measure } from '../elements/measure';
import { Subject } from 'rxjs';

export class SheetMusicService {
  sheetMusic = new Subject<SheetMusic>();

  private readonly measures: Measure[] = [];

  private currentMeasureNumber = 0;

  addMeasure(measure: Measure): void {
    this.measures[this.currentMeasureNumber] = measure;

    this.currentMeasureNumber++;

    this.invokeRenderingSheetMusic();
  }

  private invokeRenderingSheetMusic(): void {
    this.sheetMusic.next(new SheetMusic(this.measures));
  }
}
