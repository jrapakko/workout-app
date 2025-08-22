export class MockAuthService {
  getAuthHeader(): HeadersInit {
    return new Headers({ 'Content-Type': 'application/json; charset=UTF-8', Authorization: 'Bearer mock-token' });
  }

  async getUserName(): Promise<string | undefined> {
    return Promise.resolve('user');
  }

  logout(): void {
    // Mock logout implementation
  }
}