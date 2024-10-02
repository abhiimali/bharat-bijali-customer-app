import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = 'http://localhost:8080/api/customer/invoice';

  constructor(private http: HttpClient) { }

  getInvoice(billId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getinvoice?billId=${billId}`);
  }
}
