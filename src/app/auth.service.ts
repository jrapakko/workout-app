import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oauthUrl = 'http://localhost:8083/realms/workout-app/protocol/openid-connect/token';
  private logoutUrl = 'http://localhost:8083/realms/workout-app/protocol/openid-connect/logout';
  private token: string | null = null;

  constructor(private router: Router)  {}

  async login(username: string, password: string): Promise<Response> {
    return await fetch(this.oauthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        'client_id': 'angular-client',
        'username': username,
        'password': password,
        'grant_type': 'password',
        'client_secret': environment.oAuthClientSecret // Replace with your actual client secret
      })
    });
  }

  setToken(token: string): void {
    this.token = this.token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    fetch(this.logoutUrl);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  

}
