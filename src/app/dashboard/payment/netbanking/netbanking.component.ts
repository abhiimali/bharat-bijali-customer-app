import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-netbanking',
  templateUrl: './netbanking.component.html',
  styleUrls: ['./netbanking.component.scss']
})
export class NetbankingComponent implements OnInit {
  @Input() billId!: number; 
 amount! : number
  selectedBank: string = '';
  netBankingUserName: string = '';
  password: string = '';
  otp: string = '';
  showOtpInput: boolean = false;
  paymentStatus: string | null = null;
  transactionId: string | null = null;
  isLoading: boolean = false;
  showSuccess: boolean = false;
  showError: string | null = null;

  banks = [
    { name: 'Bank A', logo: 'assets/bank-logo.png' },
    { name: 'Bank B', logo: 'assets/bank-logo.png' },
    { name: 'Bank C', logo: 'assets/bank-logo.png' },
    { name: 'Bank D', logo: 'assets/bank-logo.png' },
  ];

  constructor(
    private paymentService: PaymentService,
    private router: Router
  ) {}

  selectBank(bank: string) {
    this.selectedBank = bank;
    this.showOtpInput = false;
  }

  continue() {
    if (!this.validateCredentials()) {
      this.showError = "Please fill out all the fields correctly.";
      return;
    }

    this.isLoading = true;
    this.showError = null;

    const requestData = {
      billId: this.billId,
      paymentType: 'NET_BANKING',
      netBankingUserName: this.netBankingUserName,
      password: this.password
    };

    this.paymentService.initiateNetBankingPayment(requestData).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response.statusCode === 200) {
          this.transactionId = response.data.transactionId;
          this.showOtpInput = true;
        } else {
          this.showError = response.message;
        }
      },
      (error) => {
        console.log("Error ", error);
        this.isLoading = false;
        this.showError = error.error.message;
      }
    );
  }

  pay() {
    if (!this.otp || this.otp.length !== 6) {
      this.showError = "Please enter a valid 6-digit OTP.";
      return;
    }

    this.isLoading = true;
    this.showError = null;

    const verifyRequestData = {
      transactionId: this.transactionId,
      otp: this.otp
    };

    this.paymentService.confirmNetBankingPayment(verifyRequestData).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response.statusCode === 200) {
          this.amount = response.data.amount;
          this.paymentStatus = 'Payment Successful!';
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/dashboard/bills']);
          }, 5000);
        } else {
          this.showError = response.message;
        }
      },
      (error) => {
        this.isLoading = false;
        this.showError = "An error occurred. Please try again.";
      }
    );
  }

  validateCredentials() {
    return this.netBankingUserName.trim() !== '' && this.password.trim() !== '';
  }

  ngOnInit(): void {}
}
