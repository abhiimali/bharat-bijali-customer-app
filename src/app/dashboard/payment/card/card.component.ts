import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  otp: string = '';
  showOtpInput: boolean = false;
  paymentStatus: string | null = null;
  transactionId: string = '';

  cardHolderName: string = '';
  cardHolderNameError: boolean = false;

  @Input() billId!: number;

  // Error handling
  cardNumberError: string | null = null;
  expiryDateError: string | null = null;
  cvvError: string | null = null;

  paymentStatusClass: string = '';

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {}

  validateCardHolderName() {
    this.cardHolderNameError = this.cardHolderName.trim() === '';
  }

  validateCardNumber() {
    const cardNumberRegex = /^\d{16}$/;
    this.cardNumberError = cardNumberRegex.test(this.cardNumber.replace(/\s+/g, '')) ? null : 'Invalid card number';
  }

  validateExpiryDate() {
    const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    this.expiryDateError = expiryRegex.test(this.expiryDate) ? null : 'Invalid expiry date format';
  }

  validateCvv() {
    const cvvRegex = /^\d{3}$/;
    this.cvvError = cvvRegex.test(this.cvv) ? null : 'Invalid CVV';
  }

  isFormValid(): boolean {
    return (
      !this.cardHolderNameError &&
      !this.cardNumberError &&
      !this.expiryDateError &&
      !this.cvvError &&
      !!this.cardNumber &&
      !!this.expiryDate &&
      !!this.cvv &&
      !!this.cardHolderName
    );
  }

  formatCardNumber() {
    const cleaned = this.cardNumber.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
    this.cardNumber = formatted;
    this.validateCardNumber();
  }

  continue() {
    if (this.isFormValid()) {
      const payload = {
        billId: this.billId,
        amount: 99,
        paymentType: 'CARD',
        cardHolderName: this.cardHolderName,
        cardNumber: this.cardNumber.replace(/\s+/g, ''),
        cvv: this.cvv,
        expiryDate: this.expiryDate
      };

      this.paymentService.makeCardPayment(payload).subscribe({
        next: (response: any) => {
          if (response.statusCode === 200) {
            this.transactionId = response.data;
            this.showOtpInput = true;
            this.paymentStatus = null; // Clear previous status messages
            this.paymentStatusClass = ''; // Clear previous status class
          } else {
            this.paymentStatus = response.message;
            this.paymentStatusClass = 'error-message'; // Use error class for styling
          }
        },
        error: () => {
          this.paymentStatus = 'An error occurred. Please try again.';
          this.paymentStatusClass = 'error-message'; // Use error class for styling
        }
      });
    }
  }

  pay() {
    const payload = {
      transactionId: this.transactionId,
      otp: this.otp
    };

    this.paymentService.verifyCardPayment(payload).subscribe({
      next: (response: any) => {
        if (response.statusCode === 200) {
          this.paymentStatus = `Payment Successful! Amount: ₹${response.data.amount}, Transaction ID: ${response.data.transactionId}`;
          this.paymentStatusClass = 'success-message'; // Add success class
          setTimeout(() => {
            this.router.navigate(['/dashboard/bills']);
          }, 5000); 
        } else {
          this.paymentStatus = 'Payment Failed. Please try again.';
          this.paymentStatusClass = 'error-message'; 
        }
      },
      error: () => {
        this.paymentStatus = 'An error occurred. Please try again.';
        this.paymentStatusClass = 'error-message';
      }
    });
  }

}
