import {TestBed, inject, async, getTestBed} from '@angular/core/testing';

import {SongItemService} from './song-item.service';
import {
  BaseRequestOptions, Http, HttpModule, ResponseOptions, XHRBackend, Response,
  RequestMethod
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {SongItem} from '../../Model/songItem';

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
                    id: 26
                  }]
              }
            )));
        });

      songItemService.getSongs().subscribe(
        (data) => {
          expect(data.length).toBe(1);
        });
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

  it('should insert new songItem',
    async(inject([SongItemService], (songItemService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {

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

  // --------------------------------------
  it('should save updates to an existing songItem',
    async(inject([SongItemService], (songItemService) => {
      mockBackend.connections.subscribe(connection => {
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

  it('should delete an existing blog entry',
    async(inject([SongItemService], (songItemService) => {
      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Delete);
        // connection.mockRespond(new ResponseOptions({status: 204}));
      });

      songItemService.deleteSongById(23).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          // expect(successResult.status).toBe(204);
        },
        (errorResult) => {
          throw (errorResult);
        });
    })));

});
