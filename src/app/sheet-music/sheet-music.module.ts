import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheetMusicComponent } from './sheet-music.component';
import { SheetMusicService } from './services/sheet-music.service';
import { SheetMusicRenderer } from './services/sheet-music-renderer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SheetMusicComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [SheetMusicComponent],
  providers: [SheetMusicService, SheetMusicRenderer],
})
export class SheetMusicModule {}
