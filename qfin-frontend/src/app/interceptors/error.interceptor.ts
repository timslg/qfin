import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AlertService } from '../features/dashboard/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 0) {
            this.alertService.error('Could not connect to the server.');
          } else if (error.status == 401) {
            this.alertService.error('Unauthorized: Please sign in again.');
          } else if (error.status == 500) {
            this.alertService.error('The server is facing issues. Try again later.');
          } else if (error.status == 400) {
            this.alertService.error(error.error?.error || 'Could not perfom operation.');
          }
          return throwError(() => error);
        })
    );
  }
}
