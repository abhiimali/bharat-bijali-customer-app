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

  initiateNetBankingPayment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay`, data);
  }

  confirmNetBankingPayment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-pay`, data);
  }

  private baseUrl = 'http://localhost:8080/api/customer/cashpayment';


  getCashPaymentRequestStatus(billId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cash-payment-request-status/${billId}`);
  }

  requestCashPayment(requestBody: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/request-cash-payment`, requestBody);
  }

  cancelCashPayment(requestId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/cancel-cash-payment-request/${requestId}`,null);
  }

  rescheduleCashPayment(requestBody: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/reschedule-cash-payment-request/`, requestBody);
  }

}
