import { Component } from '@angular/core';
import { NewMeasureComponent } from './new-measure/new-measure.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { SheetMusicService } from '../sheet-music/services/sheet-music.service';
import { Measure } from '../sheet-music/elements/measure';
import { TimeSignature } from '../sheet-music/elements/time-signature';

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

        this.sheetMusicService.addMeasure(
          new Measure(clefType, timeSignature, []),
        );
      }
    });
  }
}
