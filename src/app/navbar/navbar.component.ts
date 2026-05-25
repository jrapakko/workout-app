import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
    NgbCollapse,
    RouterLink
],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userName: string = 'User';
  isMenuCollapsed: boolean = true;
  constructor(private authService: AuthService) {
    this.authService.getUserName().then((name: string | undefined) => {
      this.userName = name || 'User';
    });
   }

   logout(): void {
    this.authService.logout();
   }
}
