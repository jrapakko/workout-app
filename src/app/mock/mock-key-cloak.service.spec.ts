export class MockKeycloakService {
  authenticated = true;
  token = 'mock-token';
  logout() {
    return;
  }
}