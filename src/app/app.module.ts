import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SheetMusicModule } from './sheet-music/sheet-music.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SheetMusicModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
