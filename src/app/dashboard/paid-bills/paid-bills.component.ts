import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/common/notification/notification.service';

interface Bill {
  billId: number;
  billName: string;
  description: string;
  billType: string; // e.g., 'ELECTRICITY', 'RECONNECTION'
  amount: number;
  dueDate: string; // Date in string format
  billMonth: string; // New field for billMonth
  billYear: number;  // New field for billYear
  unitConsumed: number; // New field for unit consumed
  billStatus: string; // 'PAID' or 'PENDING'
  createdAt: string;  // New field for created date
  updatedAt: string;  // New field for updated date
}

@Component({
  selector: 'app-paid-bills',
  templateUrl: './paid-bills.component.html',
  styleUrls: ['./paid-bills.component.scss']
})
export class PaidBillsComponent implements OnInit {
  bills: Bill[] = [];
  searchQuery: string = '';
  selectedMonth: string = '';
  selectedYear: string = '';
  selectedBillType: string = '';

  constructor(private http: HttpClient, private router: Router, private notification: NotificationService) {}

  ngOnInit(): void {
    this.fetchBills();
  }

  // Fetch bills from API on component initialization
  fetchBills(): void {
    this.http.get<Bill[]>('http://localhost:8080/api/customer/bills')
      .subscribe(
        (response: any) => {
          this.bills = response.data; // Assuming data is returned inside "data" field
        },
        (error) => {
          this.notification.showError("Session Expired. Please Login Again");
          console.error('Error fetching bills:', error);
        }
      );
  }

  // Get paid bills
  get paidBills() {
    return this.filterBills('PAID');
  }

  filterBills(status: string) {
    return this.bills
      .filter(bill => bill.billStatus === status)
      .filter(bill => 
        (this.selectedMonth ? bill.billMonth === this.selectedMonth : true) &&
        (this.selectedYear ? bill.billYear.toString() === this.selectedYear : true) &&
        (this.selectedBillType ? bill.billType === this.selectedBillType : true) &&
        (this.searchQuery ? bill.billName.toLowerCase().includes(this.searchQuery.toLowerCase()) : true)
      );
  }

  viewInvoice(billId: number): void {
    // Placeholder for invoice viewing logic, implement later with API call
    console.log(`Viewing invoice for bill: ${billId}`);
  }

  viewReceipt(billId: number): void {
    // Placeholder for receipt viewing logic, implement later with API call
    console.log(`Viewing receipt for bill: ${billId}`);
  }

  get totalAmountPaid() {
    return this.paidBills.reduce((sum, bill) => sum + bill.amount, 0);
  }
}
