export class MockKeycloakService {
  authenticated = true;
  authServerUrl = 'http://keycloak.localhost/';
  realm = 'workout-app';
  logout() {
    return;
  }
}
