import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {SongItem} from '../../Model/songItem';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


// Makes this class injectable as a service to another class
@Injectable()
export class SonItemService {

  // Base Url
  private baseUrl = 'http://#/v1/songs';

  // Resolve HTTP using the constructor
  constructor(private http: Http) {
  }

  // Get all songItems
  getSongs(): Observable<SongItem[]> {
    // Get request
    return this.http.get(`${this.baseUrl}`, this.getHeader())
    // and calling .json() on the response to return data
      .map((res: Response) => res.json())
      // catch error
      .catch((error: any) => Observable.throw(error.json().error || 'get request server error'));
  }

  // Add a new songItem
  addSong(body: Object): Observable<SongItem[]> {

    return this.http.post(`${this.baseUrl}`, body, this.getHeader())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'add a new songItem request server error'));
  }

  // Get songItem by ID
  getSongById(id: number): Observable<SongItem[]> {

    return this.http.get(`${this.baseUrl}/${id}`, this.getHeader())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'get SongItem by Id request server error'));
  }

  // Update songItem by ID
  updateSongById(id: number, body: Object): Observable<SongItem[]> {

    return this.http.put(`${this.baseUrl}/${id}`, body, this.getHeader())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'update songItem request error'));
  }

  // Delete songItem by ID
  deleteSongById(id: number): Observable<SongItem[]> {

    return this.http.delete(`${this.baseUrl}/${id}`, this.getHeader())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'delete a songItem request server error'));
  }

  // Private methods
  private getHeader() {
    const header = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: header});

    return options;
  }

}
