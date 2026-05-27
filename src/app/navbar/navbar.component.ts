import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userName: string = 'User';

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
