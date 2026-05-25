import {
  provideKeycloak,
  withAutoRefreshToken,
  AutoRefreshTokenService,
  UserActivityService,
  includeBearerTokenInterceptor,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  createInterceptorCondition,
  type IncludeBearerTokenCondition
} from 'keycloak-angular';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

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
    // HttpClient + keycloak's built-in bearer-token interceptor. The interceptor
    // attaches the access token to requests whose URL matches a configured
    // condition, so individual services no longer hand-build Authorization headers.
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [
        // Matches environment.apiUrl's origin (https://api.jrpko.dev/...).
        createInterceptorCondition<IncludeBearerTokenCondition>({
          urlPattern: /^https:\/\/api\.jrpko\.dev(\/.*)?$/i
        })
      ]
    }
  ]
};
