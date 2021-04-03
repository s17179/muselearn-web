import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheetMusicComponent } from './sheet-music.component';
import { SheetMusicService } from './services/sheet-music.service';
import { SheetMusicRenderer } from './services/sheet-music-renderer';

@NgModule({
  declarations: [SheetMusicComponent],
  imports: [CommonModule],
  exports: [SheetMusicComponent],
  providers: [SheetMusicService, SheetMusicRenderer],
})
export class SheetMusicModule {}
