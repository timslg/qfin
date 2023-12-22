import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Transaction } from '../interfaces/transaction';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  public transactions(account_id?: string | null) {
    let params = new HttpParams();
    if (account_id) {
      params = params.set('account', account_id);
    }
    return this.http.get<Transaction[]>(`${environment.apiUrl}/transactions`, { params: params });
  }

  public createTransaction(transaction: Transaction) {
    return this.http.post<Transaction>(`${environment.apiUrl}/transactions`, transaction);
  }

  public getTransaction(transactionId: string) {
    return this.http.get<Transaction>(`${environment.apiUrl}/transactions/${transactionId}`);
  }

  public updateTransaction(transactionId: string, transaction: Transaction) {
    return this.http.patch<Transaction>(`${environment.apiUrl}/transactions/${transactionId}`, transaction);
  }

  public deleteTransaction(transactionId: string) {
    return this.http.delete<Transaction>(`${environment.apiUrl}/transactions/${transactionId}`);
  }
  
}
