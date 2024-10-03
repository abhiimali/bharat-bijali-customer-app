import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  transactionId: string;
  amount: number;
  status: string;
  timestamp: string;
  paymentType: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  totalElements: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/payment/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(page: number = 0, size: number = 10): Observable<ApiResponse<Transaction[]>> {
    return this.http.get<ApiResponse<Transaction[]>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
}
