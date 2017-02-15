/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PanelSizingService } from './panel-sizing.service';

describe('PanelSizingServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanelSizingService]
    });
  });

  it('should ...', inject([PanelSizingService], (service: PanelSizingService) => {
    expect(service).toBeTruthy();
  }));
});
