import { TestBed } from '@angular/core/testing';

import { Jogo } from './jogo';

describe('Jogo', () => {
  let service: Jogo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Jogo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
