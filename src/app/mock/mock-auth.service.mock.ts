import { Observable, of } from 'rxjs';

export class MockAuthService {
  getUserName(): Observable<string | undefined> {
    return of('user');
  }

  logout(): void {
    // Mock logout implementation
  }
}
