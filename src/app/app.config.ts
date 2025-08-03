import { provideKeycloak, withAutoRefreshToken, AutoRefreshTokenService, UserActivityService } from 'keycloak-angular';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloak({
         config: {
           url: 'http://keycloak.localhost/',
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
    provideAnimationsAsync(),
    provideZoneChangeDetection({
      eventCoalescing: true
    })
  ]
};
