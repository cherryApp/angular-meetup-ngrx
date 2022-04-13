import { TestBed } from '@angular/core/testing';

import { StatefulUserServiceService } from './stateful-user-service.service';

describe('StatefulUserServiceService', () => {
  let service: StatefulUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatefulUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
