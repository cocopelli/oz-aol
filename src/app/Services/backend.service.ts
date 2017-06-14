import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Makes this class injectable as a service to another class
@Injectable()
export class BackendService {

  // Base Url
  private baseUrl = 'http://www.#';

  // Resolve HTTP using the constructor
  constructor(private http: Http) { }

  // Get all items
  getItems(sls: string): Observable<any[]> {
    // Get request
    return this.http.get(`${this.baseUrl}/${sls}`, this.getHeader())
    // and calling .json() on the response to return data
      .map((res: Response) => res.json())
      // catch error
      .catch((error: any) => Observable.throw(error.json().error || 'get items server error'));
  }

  // Add a new item
  addItem(sls: string, body: Object): Observable<any[]> {

    return this.http.post(`${this.baseUrl}/${sls}`, body, this.getHeader())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'add new item server error'));
  }

  // Get item by ID
  getItemById(sls: string, id: number): Observable<any[]> {

    return this.http.get(`${this.baseUrl}/${sls}/${id}`, this.getHeader())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'get item by id server error'));
  }

  // Update item by ID
  updateItemById(sls: string, id: number, body: Object): Observable<any[]> {

    return this.http.put(`${this.baseUrl}/${sls}/${id}`, body, this.getHeader())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'update item by id server error'));
  }

  // Delete item by ID
  deleteItemById(sls: string, id: number): Observable<any[]> {

    return this.http.delete(`${this.baseUrl}/${sls}/${id}`, this.getHeader())
      .catch((error: any) => Observable.throw(error.json().error || 'delete item by id server error'));
  }

  // Private methods
  private getHeader() {
    const header = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: header});

    return options;
  }

}
