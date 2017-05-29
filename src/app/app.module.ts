import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import {ListComponent} from './ListView/list.component';
import {EditComponent} from './EditView/edit.component';
import {SongComponent} from './SongView/song.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditComponent,
    SongComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
