import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }

  private isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/sign-up`, {
      name,
      email,
      password
    })
  };

  singin(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/sign-in`, {
      email,
      password
    }).pipe(
      tap((data: any) => {
        const token = data.token;
        if(!this.isTokenExpired(data.token)) {
          this.localStorageService.saveData('token', token);
        }
      })
    )
  };

  signout() {
    this.localStorageService.removeData('token');
    this.router.navigate(['/sign-in']);
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.getData('token');
    if (token) {
      return !this.isTokenExpired(token);
    } else {
      return false;
    }
  }

  get token(): string | undefined {
    const token = this.localStorageService.getData('token');
    if(token && !this.isTokenExpired(token)) {
      return token;
    } else {
      return undefined;
    }
  }
}
