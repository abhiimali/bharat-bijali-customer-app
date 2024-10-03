// src/app/payment-receipt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentReceiptService {
  private baseUrl = 'http://localhost:8080/api/payment';

  constructor(private http: HttpClient) {}

  getPaymentReceipt(billId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment-receipt?billId=${billId}`);
  }
  
}
