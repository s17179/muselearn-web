import { SheetMusicRenderer } from './sheet-music-renderer';
import { Injectable } from '@angular/core';
import { SheetMusic } from '../elements/sheet-music';
import { Measure } from '../elements/measure';

@Injectable()
export class SheetMusicService {
  private readonly measures: Map<number, Measure> = new Map();
  private currentMeasureNumber = 1;

  constructor(private readonly sheetMusicRenderer: SheetMusicRenderer) {}

  addMeasure(measure: Measure): void {
    this.measures.set(this.currentMeasureNumber, measure);

    this.currentMeasureNumber++;
  }

  render(div: HTMLDivElement): void {
    const measures: Measure[] = [];

    this.measures.forEach((measure) => measures.push(measure));

    const sheetMusic = new SheetMusic(measures);

    this.sheetMusicRenderer.render(sheetMusic, div);
  }
}
