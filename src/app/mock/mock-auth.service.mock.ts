export class MockAuthService {
  getAuthHeader(): HeadersInit {
    return new Headers({ 'Content-Type': 'application/json; charset=UTF-8', Authorization: 'Bearer mock-token' });
  }

  async getUserName(): Promise<string | undefined> {
    return 'user';
  }

  logout(): void {
    // Mock logout implementation
  }
}