import { inject, Injectable } from '@angular/core';

import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private refreshToken: string | null = null;

private readonly keycloak = inject(Keycloak);

  constructor()  {}


  // TODO: header should be set in the interceptor
  getAuthHeader(): HeadersInit {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", `Bearer ${this.keycloak.token}`);
    return myHeaders;
  }

}
