import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { route2Resolver } from './route2.routing';

describe('route2Resolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => route2Resolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
