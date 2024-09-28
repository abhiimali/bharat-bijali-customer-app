import { HttpClient } from '@angular/common/http';
import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/common/notification/notification.service';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {

  customerId!: string;
  otp: string[] = Array(6).fill('');
  otpBoxes: number[] = [0, 1, 2, 3, 4, 5];
  timeLeft: number = 300; // 5 minutes in seconds
  interval: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute
    , private notificationService : NotificationService
  ) {}

  ngOnInit() {
    this.startTimer();
    this.route.params.subscribe(params => {
      this.customerId = params['customerId'];
    });
    
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.router.navigate(['/login']); // Redirect after timeout
      }
    }, 1000);
  }

  moveFocus(index: number) {
    if (this.otp[index].length === 1 && index < this.otpBoxes.length - 1) {
      const nextInput = document.getElementsByClassName('otp-box')[index + 1] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  verifyOtp() {
    const otpCode = this.otp.join('');
  
    const body = { customerId: this.customerId, otpCode };
  
    this.http.post<{ message: string }>('http://localhost:8080/api/customer/verify-otp', body)
      .subscribe(response => {
        this.notificationService.showSuccess(response.message);
  
        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']);  
  
      }, error => {
        if (error.error && error.error.message) {
          this.notificationService.showError(error.error.message); // Display error message from the API
        } else {
          this.notificationService.showError("OTP verification failed! Please try again."); // Fallback error message
        }
  
        console.error('Error verifying OTP:', error);
      });
  }
  

  goBack() {
    this.router.navigate(['authentication']);
  }
}
