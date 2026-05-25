import { provideKeycloak, withAutoRefreshToken, AutoRefreshTokenService, UserActivityService } from 'keycloak-angular';
import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { WorkoutService } from './workout.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloak({
         config: {
           url: 'https://keycloak.jrpko.dev/',
           realm: "workout-app",
           clientId: 'angular-client'
         },
         initOptions: {
           onLoad: 'login-required',
          //  silentCheckSsoRedirectUri: 'http://keycloak.localhost/realms/workout-app/protocol/openid-connect/login-status-iframe.html'
         },
         features: [
          withAutoRefreshToken({
            sessionTimeout: 300000, // 5 minutes
            onInactivityTimeout: 'login'
          })
         ],
         providers: [
          AutoRefreshTokenService,
          UserActivityService
         ]
    }),
    provideRouter(routes),
    provideZoneChangeDetection({
      eventCoalescing: true
    }),
    // Create the user + regimen once, before the app renders, so no page races an
    // undefined user. A transient failure doesn't block bootstrap — getUser()
    // retries when a component next asks for it.
    provideAppInitializer(() => inject(WorkoutService).getUser().catch(() => undefined))
  ]
};
