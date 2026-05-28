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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { WorkoutService } from './workout.service';
import { LoadingService } from './loading.service';
import { errorInterceptor } from './error.interceptor';
import { environment } from '../environments/environment';

// Builds `^<origin>(/.*)?$` (case-insensitive) from a URL's origin so the
// bearer interceptor only attaches the token to requests whose host matches.
const originPattern = (url: string): RegExp =>
  new RegExp(`^${new URL(url).origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/.*)?$`, 'i');

export const appConfig: ApplicationConfig = {
  providers: [
    // initOptions present so keycloak-angular runs its built-in app initializer,
    // which also configures registered features (e.g. withAutoRefreshToken).
    provideKeycloak({
         config: environment.keycloak,
         initOptions: {
           onLoad: 'login-required',
           // keycloak-js's iframe session check fires callbacks outside any
           // injection context; when it errors (e.g. third-party-cookie blocks
           // or CSP), Angular's INTERNAL_APPLICATION_ERROR_HANDLER factory
           // tries to inject(EnvironmentInjector) and crashes with NG0203.
           // We already use withAutoRefreshToken for session lifetime, so
           // disabling the iframe loses nothing.
           checkLoginIframe: false
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
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
    provideZoneChangeDetection({
      eventCoalescing: true
    }),
    // HttpClient interceptors: errorInterceptor is outermost so it sees errors
    // from both the bearer-token interceptor and the network. The bearer
    // interceptor attaches the access token for URLs matching the conditions
    // in INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG.
    provideHttpClient(withInterceptors([errorInterceptor, includeBearerTokenInterceptor])),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [
        // Backend API origin (from environment.apiUrl).
        createInterceptorCondition<IncludeBearerTokenCondition>({
          urlPattern: originPattern(environment.apiUrl)
        }),
        // Keycloak's own endpoints (e.g. userinfo) so AuthService can use HttpClient.
        createInterceptorCondition<IncludeBearerTokenCondition>({
          urlPattern: originPattern(environment.keycloak.url)
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
