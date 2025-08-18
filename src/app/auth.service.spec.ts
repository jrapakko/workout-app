import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { MockKeycloakService } from './mock/mock-key-cloak.service.spec';

import Keycloak from 'keycloak-js';
describe('AuthService', () => {
  let service: AuthService;
  let kc: Keycloak;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: Keycloak, useClass: MockKeycloakService } ]
    });
    service = TestBed.inject(AuthService);
    kc = TestBed.inject(Keycloak);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getHeaders should be correct', () => {
    const headers = service.getAuthHeader();
    const expectedHeaders = new Headers({ 'Content-Type': 'application/json; charset=UTF-8', Authorization: 'Bearer mock-token' });
    expect(headers).toEqual(expectedHeaders);
  });

  it('#logout should return void', () =>  {
    const returnValue = service.logout();
    expect(returnValue).toBeUndefined();
  });
});

describe('AuthServiceUserName', () => {
  /* use jasmine to spyon global fetch call made to keycloak backend */
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: Keycloak, useClass: MockKeycloakService }]
    });
    service = TestBed.inject(AuthService);

    const userResponse = new Response(JSON.stringify({ preferred_username: 'user' }), { status: 200, statusText: 'OK' });

    spyOn(window, 'fetch').and.returnValue(Promise.resolve(userResponse));

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getUserName should return the user name', async () => {
    const userName = await service.getUserName();
    expect(userName).toBe('user');
  });
});
