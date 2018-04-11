import { TestBed, inject } from '@angular/core/testing';

import { TreedataService } from './treedata.service';

describe('TreedataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreedataService]
    });
  });

  it('should be created', inject([TreedataService], (service: TreedataService) => {
    expect(service).toBeTruthy();
  }));
});
