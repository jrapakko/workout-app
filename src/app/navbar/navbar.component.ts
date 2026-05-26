import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  userName: string = 'User';
  isMenuCollapsed: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserName().subscribe(name => {
      this.userName = name || 'User';
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
