import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/Interfaces/Transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getTransaction(transactionNo: string): Observable<Transaction | undefined> {
    return this.http.get<Transaction>(`${this.apiUrl}/${transactionNo}`);
  }
}
