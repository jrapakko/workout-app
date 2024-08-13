import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgbCollapse,
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loginService: LoginService = inject(LoginService);
  isMenuCollapsed: boolean = true;
}
