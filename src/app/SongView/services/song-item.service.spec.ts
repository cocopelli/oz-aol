import {TestBed, inject, async, getTestBed, fakeAsync, tick} from '@angular/core/testing';
import {SongItemService} from './song-item.service';
import {
  BaseRequestOptions, Http, HttpModule, ResponseOptions, XHRBackend, Response, ResponseType,
  RequestMethod
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {SongItem} from '../../Model/songItem';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class MockError extends Response implements Error {
  name: any
  message: any
}

describe('SongItemService', () => {
  let mockBackend: MockBackend;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SongItemService,
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

  it('should be created', inject([SongItemService], (service: SongItemService) => {
    expect(service).toBeTruthy();
  }));

  it('should get songs async',
    async(inject([SongItemService], (songItemService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          expect(connection.request.url).toMatch(/\/songs/);

          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [
                  {
                    id: 26,
                    title: 'Tanzomat 4',
                    lyric: 'Tanz baby, tanz',
                    duration: 121
                  },
                  {
                    id: 42,
                    title: 'Pimmelmann',
                    lyric: 'Dico disco, baby',
                    duration: 134
                  }
                ]
              }
            )));
        });

      songItemService.getSongs().subscribe(
        (data) => {
          expect(data.length).toBe(2);
        });
    })));

  it('should give exception on get request',
    async(inject([SongItemService], (songItemService) => {
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

      songItemService.getSongs().subscribe(
        (successResult) => {
          expect(successResult).toBeUndefined()
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error).toEqual('get request server error');
        })
    })));

  it('should get song by Id',
    async(inject([SongItemService], (songItemService) => {
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

      songItemService.getSongById(3).subscribe(
        (songItem) => {
          expect(songItem.id).toBe(3);
        }
      )
    })));

  it('should get song by Id exeption',
    async(inject([SongItemService], (songItemService) => {
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

      songItemService.getSongById(99).subscribe(
        (succesResult) => {
          expect(succesResult).toBeUndefined();
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error).toEqual('get SongItem by Id request server error');
        }
      )
    })));

  it('should insert new songItem',
    async(inject([SongItemService], (songItemService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          expect(connection.request.method).toBe(RequestMethod.Post);
          connection.mockRespond(new Response(new ResponseOptions({status: 201})));
        });

      const data: SongItem = new SongItem('PimmelMann 2', 'Hyper Hyper Pimmel', 150);
      songItemService.addSong(data).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          // expect(successResult.status).toBe(201);
        });
    })));

  it('should give a add new songItem exeption',
    async(inject([SongItemService], (songitemService) => {
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

      songitemService.addSong(99).subscribe(
        (successResult) => {
          expect(successResult).toBeUndefined()
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error).toEqual('add a new songItem request server error');
        })
    })));

  it('should save updates to an existing songItem',
    async(inject([SongItemService], (songItemService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          // is it the correct REST type for an update? (PUT)
          expect(connection.request.method).toBe(RequestMethod.Put);
          connection.mockRespond(new Response(new ResponseOptions({status: 204})));
        });

      const data: SongItem = new SongItem('Discomat', 'ich fühl mich Disko Disko', 200);
      songItemService.updateSongById(data).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          // expect(successResult.status).toBe(204);
        });
    })));

  it('should give a save updates exeption',
    async(inject([SongItemService], (songItemService) => {
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

      songItemService.updateSongById(88).subscribe(
        (successResult) => {
          expect(successResult).toBeUndefined()
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error).toEqual('update songItem request error')
        }
      )
    })));

  it('should delete an existing blog entry',
    async(inject([SongItemService], (songItemService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Delete);
        });

      songItemService.deleteSongById(23).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          // expect(successResult.status).toBe(204);
        });
    })));

  it('should give a delete song exaption',
    async(inject([SongItemService], (songItemService) => {
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

      songItemService.deleteSongById(88).subscribe(
        (successResult) => {
          expect(successResult).toBeUndefined()
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error).toEqual('delete a songItem request server error')
        }
      )
    })));

});
