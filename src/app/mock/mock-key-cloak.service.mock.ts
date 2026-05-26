export class MockKeycloakService {
  authenticated = true;
  token = 'mock-token';
  authServerUrl = 'http://keycloak.localhost/';
  realm = 'workout-app';
  logout() {
    return;
  }
}
