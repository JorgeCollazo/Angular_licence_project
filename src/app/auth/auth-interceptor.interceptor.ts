import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<void>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          return EMPTY;
        }

        return throwError(() => new Error('Error'));
      }),
      // switchMap((event: HttpEvent<any>) => {
      //   // If it's an HTTP response, check if it's a successful response
      //   if (event instanceof HttpResponse) {
      //     // You can add additional logic here if needed
      //     console.log('Successful response:', event);
      //   }
      //   // Pass along the event
      //   return of(event);
      // })
    )
  }
}
