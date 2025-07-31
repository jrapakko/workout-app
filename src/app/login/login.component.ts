import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() : void {

    this.authService.login(this.username, this.password).then(reponse => {
      reponse.json().then(data => {
        if (reponse.status !== 200) {
          console.error('Login failed', data);
          return;
        }
        this.authService.setToken(data.access_token, data.refresh_token);
        this.authService.setRefreshInterval(data.expires_in)
        this.router.navigate(['/']);
      })
    }).catch(console.error);

  }

}
