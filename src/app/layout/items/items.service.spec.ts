import { TestBed, inject } from '@angular/core/testing';

import { ItemsService } from './items.service';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemsService]
    });
  });

  it('should be created', inject([ItemsService], (service: ItemsService) => {
    expect(service).toBeTruthy();
  }));
});
