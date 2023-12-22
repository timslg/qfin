import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../interfaces/account';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, public alertService: AlertService) { }

  public getAccounts() {
    return this.http.get<Account[]>(`${environment.apiUrl}/accounts`);
  }

  public createAccount(account: Account) {
    return this.http.post<Account>(`${environment.apiUrl}/accounts`, account);
  }

  public getAccount(account_id: string) {
    return this.http.get<Account>(`${environment.apiUrl}/accounts/${account_id}`);
  }

  public updateAccount(account_id: string, account: Account) {
    return this.http.patch<Account>(`${environment.apiUrl}/accounts/${account_id}`, account);
  }

  public deleteAccount(account_id: string) {
    return this.http.delete<Account>(`${environment.apiUrl}/accounts/${account_id}`);
  }

}
