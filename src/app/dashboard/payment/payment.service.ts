import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payment';

  constructor(private http: HttpClient) {}

  payWithUpi(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay`, paymentData);
  }

  makeCardPayment(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay`, payload);
  }

  verifyCardPayment(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-card-payment`, payload);
  }


}
