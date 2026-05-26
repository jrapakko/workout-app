import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import Keycloak from 'keycloak-js';

interface UserInfoResponse {
  preferred_username?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly keycloak: Keycloak,
    private readonly http: HttpClient
  ) {}

  getUserName(): Observable<string | undefined> {
    if (!this.keycloak.authServerUrl) {
      console.warn('Keycloak URL is not configured or available.');
      return of(undefined);
    }
    const base = this.keycloak.authServerUrl.endsWith('/')
      ? this.keycloak.authServerUrl
      : `${this.keycloak.authServerUrl}/`;
    const userinfoUrl = new URL(
      `realms/${this.keycloak.realm}/protocol/openid-connect/userinfo`,
      base
    ).toString();

    return this.http.get<UserInfoResponse>(userinfoUrl).pipe(
      map(data => data.preferred_username),
      catchError(err => {
        console.error('Failed to fetch user info from Keycloak:', err);
        return of(undefined);
      })
    );
  }

  logout(): void {
    this.keycloak.logout();
  }
}
