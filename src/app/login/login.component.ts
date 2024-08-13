import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../auth/login.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);

  username: string = '';
  password: string = '';

  onSubmit() {
    console.log(this.username);
    console.log(this.password);
    this.loginService.isLoggedIn = true;
    this.router.navigate(['']);
  }
}
