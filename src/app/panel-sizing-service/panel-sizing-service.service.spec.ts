/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PanelSizingServiceService } from './panel-sizing-service.service';

describe('PanelSizingServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanelSizingServiceService]
    });
  });

  it('should ...', inject([PanelSizingServiceService], (service: PanelSizingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
