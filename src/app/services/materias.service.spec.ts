import { TestBed } from '@angular/core/testing';

import { MateriaService } from './materias.service';

describe ('MateriasService', () => {
  let service: MateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
