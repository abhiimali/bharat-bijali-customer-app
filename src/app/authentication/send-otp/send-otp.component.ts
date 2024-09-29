import { Component, OnInit , EventEmitter, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/common/notification/notification.service';
@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.scss']
})
export class SendOtpComponent implements OnInit {

  
  customerId!: string;

  constructor(private http: HttpClient , private router : Router , private notificationService : NotificationService) {}

  sendOtp() {

    const body = { customerId: this.customerId };
    
    this.http.post('http://localhost:8080/auth/customer/send-otp', body, { responseType: 'text' })
    .subscribe(response => {
      console.log('Response:', response);

      // Assuming that if the status is 200, it's a success, navigate regardless of response type
      this.notificationService.showSuccess("OTP sent successfully.");
      this.router.navigate(['authentication/verify-otp', this.customerId]);
    }, error => {
      console.error('Error sending OTP:', error);

      // Handle errors appropriately
      let errorMessage = "OTP not sent! Please try again.";
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.status === 200) {
        errorMessage = "Unexpected response format from server.";
      }
      this.notificationService.showError(errorMessage);
    });
    
  }
  

  ngOnInit(): void {
  }

}
