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
import { ApplicationConfig, inject, provideEnvironmentInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { WorkoutService } from './workout.service';
import { LoadingService } from './loading.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // initOptions present so keycloak-angular runs its built-in app initializer,
    // which also configures registered features (e.g. withAutoRefreshToken).
    provideKeycloak({
         config: {
           url: 'https://keycloak.jrpko.dev/',
           realm: 'workout-app',
           clientId: 'angular-client'
         },
         initOptions: {
           onLoad: 'login-required'
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
    },
    // Eagerly instantiate core services synchronously during environment initialization
    // (valid active injection context) before Keycloak's async initialization or any route
    // guards execute, ensuring HttpClient and its dependencies are cached.
    provideEnvironmentInitializer(() => {
      inject(WorkoutService);
      inject(LoadingService);
    })
  ]
};
