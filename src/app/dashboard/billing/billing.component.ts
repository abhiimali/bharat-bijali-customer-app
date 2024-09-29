import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { PaymentOptionComponent } from '../payment-options-component/payment-options-component.component';

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

  constructor(private http: HttpClient, private dialog: MatDialog) {}

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
          console.error('Error fetching bills:', error);
        }
      );
  }

  openPaymentModal(customerId: number, billId: number) {
    this.customerId = customerId; // Set the customer ID
    this.billId = billId; // Set the bill ID
    this.isPaymentModalOpen = true; // Open the modal
  }

  openPaymentOptions(customerId: number, billId: number) {
    const dialogRef = this.dialog.open(PaymentOptionComponent, {
      width: '400px',
      data: { billId: billId, customerId: customerId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
      console.log('The dialog was closed');
    });
  }

  closePaymentModal() {
    this.isPaymentModalOpen = false;
    this.selectedPaymentMethod = null;
    this.customerId = null; // Reset customer ID
    this.billId = null; // Reset bill ID
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
