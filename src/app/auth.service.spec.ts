import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { MockKeycloakService } from './mock/mock-key-cloak.service.mock';

import Keycloak from 'keycloak-js';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Keycloak, useClass: MockKeycloakService },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#logout should return void', () =>  {
    const returnValue = service.logout();
    expect(returnValue).toBeUndefined();
  });

  it('#getUserName should emit the preferred_username from the userinfo response', (done) => {
    service.getUserName().subscribe(userName => {
      expect(userName).toBe('user');
      done();
    });

    const req = httpMock.expectOne(
      'http://keycloak.localhost/realms/workout-app/protocol/openid-connect/userinfo'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ preferred_username: 'user' });
  });

  it('#getUserName should emit undefined when the userinfo request errors', (done) => {
    service.getUserName().subscribe(userName => {
      expect(userName).toBeUndefined();
      done();
    });

    const req = httpMock.expectOne(
      'http://keycloak.localhost/realms/workout-app/protocol/openid-connect/userinfo'
    );
    req.error(new ProgressEvent('Network error'));
  });
});
