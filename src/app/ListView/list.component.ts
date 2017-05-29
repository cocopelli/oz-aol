import {Component} from '@angular/core';
import {SongItem} from '../model/songItem';


@Component({
  selector: 'app-aol-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})

export class ListComponent {
  songs: any[] = [];

  constructor() {
    this.songs = [
      <SongItem>{
        id: 123,
        title: 'Hyper Hyper Titel 1',
        lyric: 'La Li Lu Hyper Hyper La Li Lu',
        duration: 2342
      },
      <SongItem>{
        id: 456,
        title: 'Let there be Rock',
        lyric: 'Yea Yea Yea Rock n Roll',
        duration: 4321
      }
    ];
  }

}
