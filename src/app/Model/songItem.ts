export class SongItem {
  id: number;
  title: string;
  lyric: string;
  duration: number;

  constructor(title: string, lyric: string, duration: number) {
    this.title = title;
    this.lyric = lyric;
    this.duration = duration
  }
}
