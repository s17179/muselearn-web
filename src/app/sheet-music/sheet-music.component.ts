import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { SheetMusicService } from './services/sheet-music.service';
import { Subscription } from 'rxjs';
import { SheetMusicRenderer } from './services/sheet-music-renderer';
import { SheetMusic } from './elements/sheet-music';
import { HttpClient } from '@angular/common/http';
import { MeasureData, MeasureMapper } from './services/measure.mapper';

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
    private readonly httpClient: HttpClient,
  ) {}

  ngAfterViewInit(): void {
    this.sheetMusicSubscription = this.sheetMusicService.sheetMusic.subscribe(
      (sheetMusic: SheetMusic) =>
        this.sheetMusicRenderer.render(
          sheetMusic,
          this.sheetMusicElementRef.nativeElement,
        ),
    );

    this.httpClient
      .get<MeasureData[]>('http://localhost:3000/sheet-music/current')
      .subscribe((response) => {
        response.forEach((data) =>
          this.sheetMusicService.addMeasure(MeasureMapper.map(data)),
        );
      });
  }

  ngOnDestroy(): void {
    this.sheetMusicSubscription.unsubscribe();
  }
}
