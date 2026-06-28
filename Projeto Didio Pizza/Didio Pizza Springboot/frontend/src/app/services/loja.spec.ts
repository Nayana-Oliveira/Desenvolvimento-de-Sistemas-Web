import { TestBed } from '@angular/core/testing';

import { Loja } from './loja';

describe('Loja', () => {
  let service: Loja;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loja);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
