import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from '../auth.service';

// Keep in sync with the navbar.component.css media query that swaps the desktop
// links for the mobile hamburger.
const MOBILE_BREAKPOINT = '(max-width: 768px)';

// Inline SVG icons (Material 24x24 paths) registered with MatIconRegistry so
// the navbar never depends on the external Material Icons font loading at
// runtime. Mobile content blockers block the Google Fonts request, which used
// to leave the hamburger button rendering as the literal ligature text "menu".
const SVG_ICONS: Record<string, string> = {
  menu: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
  arrow_drop_down: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>',
  logout: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>',
};

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() title = 'Workout App';
  userName: string = 'User';

  // Both menu triggers (desktop user menu + mobile hamburger).
  @ViewChildren(MatMenuTrigger) private menuTriggers!: QueryList<MatMenuTrigger>;

  private readonly mobileQuery = window.matchMedia(MOBILE_BREAKPOINT);

  // When the viewport crosses the breakpoint, the open menu's trigger button
  // gets display:none but its overlay panel stays open (orphaned). Close any
  // open menu on the crossing. Uses matchMedia's `change` (fires only on the
  // crossing) rather than window:resize, which on mobile fires constantly as
  // the address bar collapses during scroll.
  private readonly onBreakpointChange = () =>
    this.menuTriggers?.forEach(trigger => trigger.closeMenu());

  constructor(
    private readonly authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
  ) {
    for (const [name, svg] of Object.entries(SVG_ICONS)) {
      iconRegistry.addSvgIconLiteral(name, sanitizer.bypassSecurityTrustHtml(svg));
    }
  }

  ngOnInit(): void {
    this.authService.getUserName().subscribe(name => {
      this.userName = name || 'User';
    });
    this.mobileQuery.addEventListener('change', this.onBreakpointChange);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.onBreakpointChange);
  }

  logout(): void {
    this.authService.logout();
  }
}
