import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { SheetMusicService } from '../sheet-music/services/sheet-music.service';
import { EventLogService } from './event-log.service';
import { SheetMusicEvent } from '../sheet-music/events/sheet-music.event';
import { Subscription } from 'rxjs';
import {
  MeasureData,
  MeasureMapper,
} from '../sheet-music/services/measure.mapper';

interface DataSource {
  version: number;
  type: string;
  active: boolean;
}

interface Response {
  version: number;
  type: string;
}

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css'],
})
export class EventLogComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['version', 'type', 'actions'];
  dataSource = new MatTableDataSource<DataSource>();
  private highestVersion = 0;
  private eventSub!: Subscription;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly sheetMusicService: SheetMusicService,
    private readonly eventLogService: EventLogService,
  ) {}

  ngOnInit(): void {
    this.httpClient
      .get<Response[]>('http://localhost:3000/sheet-music')
      .subscribe((response) => {
        if (response.length > 0) {
          const dataSource: DataSource[] = [];

          response.forEach((data) => {
            dataSource.push({
              version: data.version,
              type: data.type,
              active: true,
            });

            this.highestVersion = data.version;
          });

          this.dataSource.data = dataSource;

          this.changeVersion(this.highestVersion);
        }
      });

    this.sheetMusicService.sheetMusicEventStream.subscribe(
      (event: SheetMusicEvent) => {
        this.dataSource.data.push({
          version: ++this.highestVersion,
          type: event.type,
          active: true,
        });

        this.dataSource.data = this.dataSource.data;

        this.changeVersion(this.highestVersion);
      },
    );
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }

  changeVersion(version: number, loadVersion = false): void {
    if (version === this.highestVersion) {
      this.eventLogService.isCurrentStateActive.next(true);
    } else {
      this.eventLogService.isCurrentStateActive.next(false);
    }

    this.dataSource.data = this.dataSource.data.map((data: DataSource) => {
      if (data.version === version) {
        return {
          version: data.version,
          type: data.type,
          active: false,
        };
      } else {
        return {
          version: data.version,
          type: data.type,
          active: true,
        };
      }
    });

    if (loadVersion) {
      this.sheetMusicService.clear();

      this.httpClient
        .get<MeasureData[]>(
          'http://localhost:3000/sheet-music/version/' + version,
        )
        .subscribe((measureData) =>
          measureData.forEach((data) =>
            this.sheetMusicService.addMeasure(MeasureMapper.map(data)),
          ),
        );
    }
  }
}
