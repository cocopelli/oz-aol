import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {SongItem} from '../../Model/songItem';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


// Makes this class injectable as a service to another class
@Injectable()
export class SonItemService {

  // Base Url
  private baseUrl = 'http://#';

  // Resolve HTTP using the constructor
  constructor(private http: Http) {
  }

  // Get all songItems
  getSongs(): Observable<SongItem[]> {
    // Get request
    return this.http.get(`${this.baseUrl}/songs`)
      // and calling .json() on the response to return data
      .map((res: Response) => res.json())
      // catch error
      .catch((error: any) => Observable.throw(error.json().error || 'get request server error'));
  }

  // Add a new songItem

  // Get songItem by ID

  // Update songItem by ID

  // Delete songItem by ID

}
