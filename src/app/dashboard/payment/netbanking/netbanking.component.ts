import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-netbanking',
  templateUrl: './netbanking.component.html',
  styleUrls: ['./netbanking.component.scss']
})
export class NetbankingComponent implements OnInit {
  @Input() billId!: number; // Parent should pass the billId
  @Input() customerId!: number;
  @Input() amount!: number;

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

  banks: string[] = ['Bank A', 'Bank B', 'Bank C', 'Bank D']; // Dummy banks

  constructor(private http: HttpClient, private router: Router) {}

  // Validate the username and password before proceeding
  validateCredentials() {
    return this.netBankingUserName.trim() !== '' && this.password.trim() !== '';
  }

  continue() {
    if (!this.validateCredentials()) {
      this.showError = "Please fill out all the fields correctly.";
      return;
    }

    // Clear error and start animation
    this.showError = null;
    this.isLoading = true;

    // Make the API request to initiate the payment
    const requestData = {
      customerId: this.customerId,
      billId: this.billId,
      amount: this.amount,
      paymentType: 'NET_BANKING',
      netBankingUserName: this.netBankingUserName,
      password: this.password
    };

    this.http.post('http://localhost:8080/api/payment/pay', requestData).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response.statusCode === 200) {
          // Move to the OTP step and save transactionId
          this.transactionId = response.data.transactionId;
          this.showOtpInput = true;
        } else {
          this.showError = response.message; // Show error if the API fails
        }
      },
      (error) => {
        this.isLoading = false;
        this.showError = "An error occurred. Please try again.";
      }
    );
  }

  pay() {
    if (!this.otp || this.otp.length !== 6) {
      this.showError = "Please enter a valid 6-digit OTP.";
      return;
    }

    // Clear error and start animation
    this.showError = null;
    this.isLoading = true;

    const verifyRequestData = {
      transactionId: this.transactionId,
      otp: this.otp
    };

    // Call the API to verify OTP and confirm the payment
    this.http.post('http://localhost:8080/api/payment/confirm-pay', verifyRequestData).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response.statusCode === 200) {
          this.paymentStatus = 'Payment Successful!';
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/dashboard/bills']);
          }, 3000); // Redirect to the bills page after 3 seconds
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

  ngOnInit(): void {}
}
