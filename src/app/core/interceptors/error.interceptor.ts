import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { LoadingService } from '../services/loading.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const errorService = inject(ErrorService);
  const loadingService = inject(LoadingService);

  loadingService.show();

  return next(req).pipe(
    catchError(error => {
      switch (error.status) {
        case 401:
          authService.logout();
          router.navigate(['/login']);
          errorService.showError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
          break;
        case 404:
          router.navigate(['/404']);
          errorService.showError('El recurso solicitado no fue encontrado.');
          break;
        case 429:
          errorService.showWarning('Demasiadas solicitudes. Por favor intenta más tarde.');
          break;
        default:
          errorService.showError('Ocurrió un error inesperado. Por favor intenta de nuevo.');
      }
      return throwError(() => error);
    }),
    finalize(() => loadingService.hide())
  );
};
