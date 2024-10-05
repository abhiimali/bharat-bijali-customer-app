import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent implements OnInit {

  customerId!: number;
  customerName!: string;
  email!: string;
  phoneNumber!: string;
  address!: string;
  showProfile = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCustomerProfile();
  }

  fetchCustomerProfile() {
    this.http.get<any>('http://localhost:8080/api/customer/profile').subscribe(data => {
      this.customerId = data.customerId;
      this.customerName = data.customerName;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      this.address = data.address;
    });
  }

  toggleProfileDetails() {
    this.showProfile = !this.showProfile;
  }

  showNotifications() {
    console.log('Show notifications');
  }

}
