import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarOpen = true; // Start with the sidebar open

  navLinks = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Bills', icon: 'payments', path: '/bills' },
    { name: 'History', icon: 'history', path: '/history' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
    { name: 'Profile', icon: 'person', path: '/profile' }
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }
}
