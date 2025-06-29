import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      console.error('HTTP Error:', error);
      
      // Handle different error status codes
      switch (error.status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('token');
          // You can inject Router service and navigate to login
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error('Unknown error occurred');
      }
      
      return throwError(() => error);
    })
  );
};
