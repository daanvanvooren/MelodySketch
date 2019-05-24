import { TestBed } from '@angular/core/testing';

import { MelodySketchDataService } from './melody-sketch-data.service';

describe('MelodySketchDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MelodySketchDataService = TestBed.get(MelodySketchDataService);
    expect(service).toBeTruthy();
  });
});
