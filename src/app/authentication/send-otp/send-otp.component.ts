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
    
    this.http.post<{ message: string }>('http://localhost:8080/api/customer/send-otp', body)
      .subscribe(response => {
        
        this.notificationService.showSuccess(response.message);
        
        this.router.navigate(['authentication/verify-otp', this.customerId]);
        
      }, error => {

        if (error.error && error.error.message) {
          this.notificationService.showError(error.error.message); 
        } else {
          this.notificationService.showError("OTP not sent! Please try again.");
        }
        
        this.router.navigate(['authentication/verify-otp', this.customerId]);
        
        console.error('Error sending OTP:', error);
      });
  }
  

  ngOnInit(): void {
  }

}
