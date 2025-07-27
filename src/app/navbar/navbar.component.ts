import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        CommonModule,
        NgbCollapse,
        RouterLink
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService) { }
  isMenuCollapsed: boolean = true;
  isLoggedIn: boolean = this.authService.isLoggedIn();

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
