import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes, routerProvider } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { tokenInterceptor } from './core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    routerProvider,
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([errorInterceptor, tokenInterceptor])),
    provideAnimations()
  ]
};
