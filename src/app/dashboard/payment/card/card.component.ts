import { Component, OnInit , Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  transactionId: string = ''; // Transaction ID from backend

  cardHolderName: string = '';
cardHolderNameError: boolean = false;

  @Input() billId!: number;

  // Error handling
  cardNumberError: string | null = null;
  expiryDateError: string | null = null;
  cvvError: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

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
    return !this.cardHolderNameError && !this.cardNumberError && !this.expiryDateError && !this.cvvError && !!this.cardNumber && !!this.expiryDate && !!this.cvv;
  }

  continue() {
    if (this.isFormValid()) {
      const payload = {
        billId: this.billId,
        amount: 99,
        paymentType: 'CARD',
        cardHolderName: this.cardHolderName,
        cardNumber: this.cardNumber,
        cvv: this.cvv,
        expiryDate: this.expiryDate
      };

      this.http.post('http://localhost:8080/api/payment/pay', payload).subscribe((response: any) => {
        this.transactionId = response.data;
        this.showOtpInput = true;
      });
    }
  }

  pay() {
    const payload = {
      transactionId: this.transactionId,
      otp: this.otp
    };

    this.http.post('http://localhost:8080/api/payment/verify-card-payment', payload).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.paymentStatus = 'Payment Successful!';
        setTimeout(() => {
          this.router.navigate(['/dashboard/bills']);
        }, 2000);
      } else {
        this.paymentStatus = 'Payment Failed. Please try again.';
      }
    });
  }
}
