// payment-option.component.ts
import { Component, Inject , ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export enum PaymentType {
  UPI = 'UPI',
  CARD = 'CARD',
  NET_BANKING = 'NET_BANKING',
  CASH = 'CASH'
}

@Component({
  selector: 'app-payment-option',
  templateUrl: './payment-options-component.component.html',
  styleUrls: ['./payment-options-component.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PaymentOptionComponent {

  customerId: number;
  billId: number;
  amount: number;
  
  upiId!: string;
  mpin!: string;
  
  // Card payment properties
  cardNumber!: string;
  cvv!: string;
  cardHolderName!: string;
  expiryDate! : Date
  
  // Net banking properties
  netBankingUserName!: string;
  password!: string;

  // Selected payment method
  selectedMethod: PaymentType;

  constructor(
    public dialogRef: MatDialogRef<PaymentOptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customerId = data.customerId;
    this.billId = data.billId;
    this.amount = data.amount;
    this.selectedMethod = PaymentType.UPI; // Default payment method
  }

  // Payment handling methods
  confirmPayment() {
    // Implement payment logic based on selected method
    console.log(`Processing payment for ${this.selectedMethod}`);
    // Add your API call here based on the payment type
    // For example: this.handleUPIPayment();
  }

  // Functions for each payment type
  handleUPIPayment() {
    // Add UPI payment handling logic here
  }

  handleCardPayment() {
    // Add Card payment handling logic here
  }

  handleNetBankingPayment() {
    // Add Net Banking payment handling logic here
  }

  requestCashPayment() {
    // Logic for cash payment request
  }
}
