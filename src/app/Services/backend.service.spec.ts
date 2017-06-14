import {TestBed, inject, async, getTestBed} from '@angular/core/testing';

import { BackendService } from './backend.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {
  ResponseOptions, Response, RequestMethod, ResponseType, BaseRequestOptions, HttpModule,
  Http, XHRBackend
} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class MockError extends Response implements Error {
  name: any
  message: any
}

describe('BackendService', () => {

  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BackendService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ],
      imports: [HttpModule]
    });

    mockBackend = getTestBed().get(MockBackend);
  }));

  it('should be created', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));

  it('should get items async',
    async(inject([BackendService], (backendService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          // expect(connection.request.url).toMatch(/\/songs/);

          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [
                  {
                    id: 26,
                    title: 'Tanzomat 4',
                    lyricId: 7766,
                    duration: 121
                  },
                  {
                    id: 42,
                    title: 'Pimmelmann',
                    lyricId: 5544,
                    duration: 134
                  }
                ]
              }
            )));
        });

      backendService.getItems().subscribe(
        (successResult) => {
          expect(successResult.length).toBe(2);
        });
    })));

  it('should give exception on get request',
    async(inject([BackendService], (backendService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          connection.mockError(
            new MockError(
              new ResponseOptions({
                body: JSON,
                type: ResponseType.Error,
                status: 404
              })
            ));
        });

      backendService.getItems().subscribe(
        (successResult) => {
          expect(successResult).toBeUndefined()
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error).toEqual('get items server error');
        })
    })));

  it('should get item by Id',
    async(inject([BackendService], (backendService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          expect(connection.request.url).toMatch(/\/songs\/3/);

          connection.mockRespond(
            new Response(
              new ResponseOptions({
                body: {
                  id: 3
                }
              }))
          );
        });

      backendService.getItemById('songs', 3).subscribe(
        (successResult) => {
          expect(successResult.id).toBe(3);
        }
      )
    })));

  it('should get item by Id exeption',
    async(inject([BackendService], (backendService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          connection.mockError(
            new MockError(
              new ResponseOptions({
                body: JSON,
                type: ResponseType.Error,
                status: 404
              })
            ));
        });

      backendService.getItemById(99).subscribe(
        (succesResult) => {
          expect(succesResult).toBeUndefined();
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error).toEqual('get item by id server error');
        }
      )
    })));

  it('should insert new songItem',
    async(inject([BackendService], (backendService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          expect(connection.request.url).toMatch(/\/setlists/);
          expect(connection.request.method).toBe(RequestMethod.Post);
          connection.mockRespond(new Response(new ResponseOptions({status: 201})));
        });

      const data = { title: 'test title', content: 'foobar'};
      backendService.addItem('setlists', data).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          // expect(successResult.status).toBe(201);
        });
    })));

  it('should give a add new item exeption',
    async(inject([BackendService], (backendService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          connection.mockError(
            new MockError(
              new ResponseOptions({
                body: JSON,
                type: ResponseType.Error,
                status: 400
              })
            ));
        });

      backendService.addItem(42).subscribe(
        (successResult) => {
          expect(successResult).toBeUndefined()
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error).toEqual('add new item server error');
        })
    })));

  it('should update to an existing item',
    async(inject([BackendService], (backendService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          expect(connection.request.url).toMatch(/\/lyrics\/6/);
          // is it the correct REST type for an update? (PUT)
          expect(connection.request.method).toBe(RequestMethod.Put);
          connection.mockRespond(new Response(new ResponseOptions({status: 204})));
        });

      const data = { tiitle: 'Jon Doe', content: 'lot of bla bla'};
      backendService.updateItemById('lyrics', 6543, data).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          // expect(successResult.status).toBe(204);
        });
    })));

  it('should give a save updates exeption',
    async(inject([BackendService], (backendService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          connection.mockError(
            new MockError(
              new ResponseOptions({
                body: JSON,
                type: ResponseType.Error,
                status: 404
              })
            ));
        });

      backendService.updateItemById(23).subscribe(
        (successResult) => {
          expect(successResult).toBeUndefined()
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error).toEqual('update item by id server error')
        }
      )
    })));

  it('should delete an existing item',
    async(inject([BackendService], (backendService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Delete);
        });

      backendService.deleteItemById(23).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          // expect(successResult.status).toBe(204);
        });
    })));

  it('should give a delete item excaption',
    async(inject([BackendService], (backendService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          connection.mockError(
            new MockError(
              new ResponseOptions({
                body: JSON,
                type: ResponseType.Error,
                status: 400
              })
            ));
        });

      backendService.deleteItemById(42).subscribe(
        (successResult) => {
          expect(successResult).toBeUndefined()
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error).toEqual('delete item by id server error')
        }
      )
    })));
});
