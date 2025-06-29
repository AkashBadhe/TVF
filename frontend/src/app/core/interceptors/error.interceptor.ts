import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError(error => {
      console.error('HTTP Error:', error);
      
      let errorMessage = 'An error occurred';
      
      // Handle different error status codes
      switch (error.status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.navigate(['/auth/login']);
          errorMessage = 'Authentication required. Please log in.';
          break;
        case 403:
          // Forbidden
          errorMessage = 'Access forbidden. You don\'t have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 422:
          errorMessage = error.error?.message || 'Validation error.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = error.error?.message || 'Unknown error occurred';
      }
      
      // Show error message to user
      snackBar.open(errorMessage, 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      
      return throwError(() => error);
    })
  );
};
