import { Injectable } from '@angular/core';

import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | undefined = undefined;
  private refreshToken: string | undefined = undefined;

  constructor(private readonly keycloak: Keycloak)  {}

  getAuthHeader(): HeadersInit {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", `Bearer ${this.keycloak.token}`);
    return myHeaders;
  }

  async getUserName(): Promise<string | undefined> {
    const baseUrl = (this.keycloak as any).url || (this.keycloak as any).authServerUrl;
    if (!baseUrl) {
      console.warn('Keycloak URL is not configured or available.');
      return undefined;
    }
    const normalizedUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    return await fetch(normalizedUrl + 'realms/' + this.keycloak.realm + '/protocol/openid-connect/userinfo', {
      headers: this.getAuthHeader()
    }).then(response => {
      if (response.ok) {
        return response.json().then(data => {
          return data.preferred_username;
      });
      } else {
        console.error('Failed to fetch user info:', response.statusText);
        return undefined;
      }
    }).catch(err => {
      console.error('Network error fetching user info from Keycloak:', err);
      return undefined;
    });
  }

  logout(): void {
    this.keycloak.logout();
  }

}
