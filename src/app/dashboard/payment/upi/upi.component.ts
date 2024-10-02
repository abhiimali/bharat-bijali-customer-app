// upi.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service'; // Importing the payment service
import { PaymentSuccessComponent } from '../payment-success/payment-success.component'; // Importing the success component

@Component({
  selector: 'app-upi',
  templateUrl: './upi.component.html',
  styleUrls: ['./upi.component.scss']
})
export class UpiComponent implements OnInit {

  @Input() billId!: number;
  upiId: string = '';
  showMpinInput: boolean = false;
  mpin: string = '';
  paymentStatus: string | null = null;
  upiIdError: string | null = null;
  mpinError: string | null = null;
  amount : number = 89

  constructor(
    private paymentService: PaymentService, // Injecting the payment service
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  validateUpiId() {
    const upiRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+$/;
    this.upiIdError = upiRegex.test(this.upiId) ? null : 'Invalid UPI ID format.';
  }

  validateMpin() {
    const mpinRegex = /^\d{4}$|^\d{6}$/;
    this.mpinError = mpinRegex.test(this.mpin) ? null : 'MPIN must be a 4 or 6 digit number.';
  }

  goBack() {
    this.showMpinInput = false;
    this.mpin = '';
    this.paymentStatus = null;
  }

  continue() {
    if (!this.upiIdError && this.upiId) {
      this.showMpinInput = true;
    }
  }

  pay() {
    if (this.mpinError || !this.mpin) return;

    const paymentData = {
      billId: this.billId,
      amount :89,
      paymentType: 'UPI',
      upiId: this.upiId,
      mpin: this.mpin
    };

    this.paymentService.payWithUpi(paymentData).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.showPaymentSuccess(response.data.transactionId, response.data.amount);
        } else {
          this.paymentStatus = response.message;
        }
      },
      (error) => {
        this.paymentStatus = error.message;
      }
    );
  }

  private showPaymentSuccess(transactionId: string, amount: number) {
    // Logic to display the success component with animation
    const successMessage = `Payment of ₹${amount} was successful! Transaction ID: ${transactionId}`;
    this.paymentStatus = successMessage;

    setTimeout(() => {
      this.router.navigate(['/dashboard/bills']);
    }, 5000); // Redirect after 5 seconds
  }
}
