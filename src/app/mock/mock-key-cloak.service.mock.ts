export class MockKeycloakService {
  authenticated = true;
  token = 'mock-token';
  url = 'http://keycloak.localhost/';
  authServerUrl = 'http://keycloak.localhost/';
  realm = 'workout-app';
  logout() {
    return;
  }
}