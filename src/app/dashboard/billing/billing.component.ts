import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { PaymentOptionComponent } from '../payment-options-component/payment-options-component.component';
import { ViewEncapsulation } from '@angular/compiler';

interface Bill {
  billId: number;
  billName: string;
  description: string;
  billType: string; // e.g., 'ELECTRICITY', 'RECONNECTION'
  amount: number;
  dueDate: string; // Date in string format
  billStatus: string; // 'PAID' or 'PENDING'
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {

  constructor(private dialog: MatDialog) {}

  searchQuery: string = '';
  selectedMonth: string = '';
  selectedYear: string = '';
  selectedBillType: string = '';

  isPaymentModalOpen = false;
  selectedPaymentMethod: string | null = null;
  customerId: number | null = null; // To store selected customer ID
  billId: number | null = null; // To store selected bill ID

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


  bills: Bill[] = [
    { billId: 1, billName: 'Electricity Bill', description: 'Monthly Electricity Bill', billType: 'ELECTRICITY', amount: 120.0, dueDate: '2024-09-15', billStatus: 'PENDING' },
    { billId: 2, billName: 'Water Bill', description: 'Monthly Water Bill', billType: 'WATER', amount: 50.0, dueDate: '2024-09-20', billStatus: 'PENDING' },
    { billId: 3, billName: 'Internet Bill', description: 'Monthly Internet Bill', billType: 'INTERNET', amount: 70.0, dueDate: '2024-08-28', billStatus: 'PAID' },
    { billId: 4, billName: 'Reconnection Fee', description: 'Fee for reconnection', billType: 'RECONNECTION', amount: 200.0, dueDate: '2024-09-05', billStatus: 'PENDING' },
    // Add more dummy data as needed
  ];

  get pendingBills() {
    return this.filterBills('PENDING');
  }

  get paidBills() {
    return this.filterBills('PAID');
  }

  filterBills(status: string) {
    return this.bills
      .filter(bill => bill.billStatus === status)
      .filter(bill => 
        (this.selectedMonth ? bill.dueDate.includes(this.selectedMonth) : true) &&
        (this.selectedYear ? bill.dueDate.includes(this.selectedYear.toString()) : true) &&
        (this.selectedBillType ? bill.billType === this.selectedBillType : true) &&
        (this.searchQuery ? bill.billName.toLowerCase().includes(this.searchQuery.toLowerCase()) : true)
      );
  }

  get totalAmountDue() {
    return this.pendingBills.reduce((sum, bill) => sum + bill.amount, 0);
  }

  get currentMonthUsage() {
    // Assuming usage is just the amount of current month pending bills
    return this.pendingBills.length; // You can modify this to include actual usage details
  }

  payBill(bill: Bill) {
    // Implement the pay bill logic
    console.log(`Paying bill: ${bill.billId}`);
  }
}
