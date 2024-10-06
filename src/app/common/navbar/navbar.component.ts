import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isNavbarOpen = false; 
  showProfile = false; 
  isAuthenticated = false; 

  customerId!: number;
  customerName!: string;
  email!: string;
  phoneNumber!: string;
  address!: string;

  constructor(private router: Router, private http: HttpClient) {
    this.isAuthenticated = localStorage.getItem('authToken') != null;
  }

  ngOnInit() {
    if (this.isAuthenticated) {
      this.fetchCustomerProfile();  // Fetch profile only if authenticated
    }
  }

  fetchCustomerProfile() {
    this.http.get<any>('http://localhost:8080/api/customer/profile').subscribe(
      data => {
        console.log(data.data);
        this.customerId = data.data.customerId;
        this.customerName = data.data.customerName;
        this.email = data.data.email;
        this.phoneNumber = data.data.phoneNumber;
        this.address = data.data.address;
      },
      error => {
        console.error('Error fetching customer profile', error);
      }
    );
  }

  toggleProfileDetails() {
    this.showProfile = !this.showProfile; 
  }

  showNotifications() {
    console.log('Show notifications');
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  navigateToLogin() {
    this.router.navigate(['/authentication']);
  }

  logout() {
    localStorage.removeItem('authToken');  // Remove authentication token
    this.isAuthenticated = false;
    this.router.navigate(['/authentication']);  // Redirect to login after logout
  }
}
