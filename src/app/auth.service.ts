import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Adjust the path as necessary
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oauthUrl = 'http://localhost:8083/realms/workout-app/protocol/openid-connect/token';
  private logoutUrl = 'http://localhost:8083/realms/workout-app/protocol/openid-connect/revoke';
  private token: string | null = null;
  private refreshToken: string | null = null;

  constructor(private router: Router)  {}

  async login(username: string, password: string): Promise<Response> {
    return await fetch(this.oauthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json; charset=UTF-8'
      },
      body: new URLSearchParams({
        'client_id': 'angular-client',
        'username': username,
        'password': password,
        'grant_type': 'password',
        'client_secret': environment.oAuthClientSecret
      })
    });
  }

  setToken(token: string, refreshToken: string): void {
    this.token = token;
    this.refreshToken = refreshToken;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('refreshToken', refreshToken);
  }

  getToken(): string | null {
    return this.token || sessionStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return this.refreshToken || sessionStorage.getItem('refreshToken');
  }

  getAuthHeader(): HeadersInit {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    if (this.getToken()) {
      myHeaders.append("Authorization", `Bearer ${this.getToken()}`);
    };
    return myHeaders;
  }


  getNewToken(): void {
    fetch(this.oauthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json; charset=UTF-8'
      },
      body: new URLSearchParams({
        'client_id': 'angular-client',
        'grant_type': 'refresh_token',
        'refresh_token': this.getRefreshToken() || '',
        'client_secret': environment.oAuthClientSecret // Replace with your actual client secret
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to refresh token');
      }
    }).then(data => {
      this.setToken(data.access_token, data.refresh_token);
      this.setRefreshInterval(data.expires_in);
    }).catch(error => {
      console.error('Error refreshing token:', error);
    });
  }

  logout(): void {
    fetch(this.logoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json; charset=UTF-8',
      },
      body: new URLSearchParams({
        'client_id': 'angular-client',
        'token': this.getRefreshToken() || '',
        'client_secret': environment.oAuthClientSecret // Replace with your actual client secret
    })
    }).then(response => {console.log(response);});
    this.token = null;
    sessionStorage.removeItem('token');
    this.refreshToken = null;
    sessionStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  
  setRefreshInterval(expiresIn: number): void {
    setTimeout(() => {
        this.getNewToken();
    }, expiresIn * 1000 - 60000); // Refresh 1 minute before expiration
  }

}
