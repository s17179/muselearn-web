import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SheetMusicModule } from './sheet-music/sheet-music.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from './menu/menu.module';
import { EventLogModule } from './event-log/event-log.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SheetMusicModule,
    BrowserAnimationsModule,
    MenuModule,
    EventLogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
