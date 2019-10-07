import { TestBed, inject } from '@angular/core/testing';

import { AccountsService } from './.service';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountsService]
    });
  });

  it('should be created', inject([AccountsService], (service: AccountsService) => {
    expect(service).toBeTruthy();
  }));
});
