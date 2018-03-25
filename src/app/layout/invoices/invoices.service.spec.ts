import { TestBed, inject } from '@angular/core/testing';

import { InvoicesService } from './invoices.service';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoicesService]
    });
  });

  it('should be created', inject([InvoicesService], (service: InvoicesService) => {
    expect(service).toBeTruthy();
  }));
});
