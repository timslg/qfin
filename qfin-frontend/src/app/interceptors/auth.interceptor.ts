import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.authService) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.authService.token}`)
      });
  
  
      return next.handle(authReq);
    }

    return next.handle(req);
    
  }
}
