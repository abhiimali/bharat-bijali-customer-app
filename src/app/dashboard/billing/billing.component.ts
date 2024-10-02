import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { PaymentOptionComponent } from '../payment-options-component/payment-options-component.component';
import {  Router } from '@angular/router';
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
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor(private http: HttpClient, private dialog: MatDialog , private router : Router,
    private notification : NotificationService
  ) {}

  searchQuery: string = '';
  selectedMonth: string = '';
  selectedYear: string = '';
  selectedBillType: string = '';
  bills: Bill[] = [];

  isPaymentModalOpen = false;
  selectedPaymentMethod: string | null = null;
  customerId: number | null = null; // To store selected customer ID
  billId: number | null = null; // To store selected bill ID

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

          this.notification.showError("Session Expired Please Login Again")
          console.error('Error fetching bills:', error);
        }
      );
  }

  openPaymentModal(customerId: number, billId: number) {
    this.customerId = customerId; // Set the customer ID
    this.billId = billId; // Set the bill ID
    this.isPaymentModalOpen = true; // Open the modal
  }

  openPaymentOptions(billId: number) {
    this.router.navigate(['/dashboard/payment', billId]);
  }

  closePaymentModal() {
    this.isPaymentModalOpen = false;
    this.selectedPaymentMethod = null;
    this.customerId = null; // Reset customer ID
    this.billId = null; // Reset bill ID
  }

  calculateTotalDiscount(amount: number): number {
    const discount = 0.05; // 5% for each offer
    const totalDiscount = amount * discount * 2; // Applying both discounts
    return totalDiscount;
  }
  
  calculateFinalAmount(amount: number): number {
    const totalDiscount = this.calculateTotalDiscount(amount);
    return amount - totalDiscount;
  }
  
  viewInvoice(billId: number): void {
    // Placeholder for invoice viewing logic, implement later with API call
    console.log(`Viewing invoice for bill: ${billId}`);
  }
  
  // Get pending bills
  get pendingBills() {
    return this.filterBills('PENDING');
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

  get totalAmountDue() {
    return this.pendingBills.reduce((sum, bill) => sum + bill.amount, 0);
  }

  get currentMonthUsage() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toUpperCase(); // Get current month in uppercase (e.g., "SEPTEMBER")
    const currentYear = new Date().getFullYear(); 

    const totalUnitConsumed = this.pendingBills
      .filter(bill => bill.dueDate.includes(currentMonth) && bill.dueDate.includes(currentYear.toString())) // Filter bills by current month and year
      .reduce((sum, bill) => sum + bill.unitConsumed, 0); 

    return totalUnitConsumed > 0 ? totalUnitConsumed : 0;
  }

  payBill(bill: Bill) {
    console.log(`Paying bill: ${bill.billId}`);
  }
}
