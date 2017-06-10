import { TestBed, inject } from '@angular/core/testing';

import { SonItemService } from './son-item.service';
import {HttpModule} from '@angular/http';

describe('SonItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SonItemService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([SonItemService], (service: SonItemService) => {
    expect(service).toBeTruthy();
  }));
});
