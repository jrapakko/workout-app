import { inject, Injectable } from '@angular/core';

import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | undefined = undefined;
  private refreshToken: string | undefined = undefined;

  private readonly keycloak = inject(Keycloak);

  constructor()  {}


  // TODO: header should be set in the interceptor
  getAuthHeader(): HeadersInit {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", `Bearer ${this.keycloak.token}`);
    return myHeaders;
  }

  async getUserName(): Promise<string | undefined> {


    return await fetch(this.keycloak.authServerUrl + 'realms/' + this.keycloak.realm + '/protocol/openid-connect/userinfo', {
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
    });
  }

  logout(): void {
    this.keycloak.logout();
  }

}
