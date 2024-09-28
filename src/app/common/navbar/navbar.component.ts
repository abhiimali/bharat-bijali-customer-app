import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isNavbarOpen = false; // Track navbar toggle state
  isProfileMenuOpen = false; // Track profile menu dropdown state
  isAuthenticated = false; // Track authentication state

  // Toggle the navbar
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  // Toggle the profile menu
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  // Method for navigation to login (implement as needed)
  navigateToLogin() {
    // Your login navigation logic here
  }

  // Method to log out the user (implement as needed)
  logout() {
    // Your logout logic here
    this.isAuthenticated = false; // Update authentication state
  }
}
