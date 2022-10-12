import { TestBed } from '@angular/core/testing';

import { ClienteCadastrOService } from './cliente-cadastr-o.service';

describe('ClienteCadastrOService', () => {
  let service: ClienteCadastrOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteCadastrOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
