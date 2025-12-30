import { TestBed } from '@angular/core/testing';

import { Evaluaciones } from './evaluaciones';

describe('Evaluaciones', () => {
  let service: Evaluaciones;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Evaluaciones);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
