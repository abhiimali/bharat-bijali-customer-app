import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { BillingComponent } from './billing/billing.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { PaymentOptionComponent } from './payment-options-component/payment-options-component.component'; // Import FormsModule

import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule

@NgModule({
  declarations: [
    DashboardHomeComponent,
    BillingComponent,
    SidebarComponent,
    PaymentComponent,
    PaymentOptionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatDialogModule
  ]
})
export class DashboardModule { }
