import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor() {}

  // Mock method to simulate getting a transaction by ID
  getTransaction(id: string | null): Observable<any> {
    // Dummy data simulating a transaction object
    const dummyTransaction = {
      id: id,
      creationDate: '1/10/24, 10:00 AM',
      progress: '50%',
      stage: 'Validando archivos',
      status: 'En proceso',
      responsible: 'Carlos Aguilar',
    };
    return of(dummyTransaction);
  }

  // Mock method to simulate updating a transaction
  updateTransaction(transaction: any): Observable<any> {
    console.log(`Updating transaction: ${JSON.stringify(transaction)}`);
    // Normally here you would call the backend service to update the transaction
    return of(transaction); // Just return the updated transaction as an observable
  }

  // Mock method to simulate deleting a transaction
  deleteTransaction(id: string): Observable<any> {
    console.log(`Deleting transaction with id: ${id}`);
    // Normally here you would call the backend service to delete the transaction
    return of(id); // Just return the id to confirm deletion
  }
}
