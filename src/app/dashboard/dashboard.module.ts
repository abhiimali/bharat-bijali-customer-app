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

import { MatDialogModule } from '@angular/material/dialog';
import { UpiComponent } from './payment/upi/upi.component';
import { CardComponent } from './payment/card/card.component';
import { NetbankingComponent } from './payment/netbanking/netbanking.component';
import { PaidBillsComponent } from './paid-bills/paid-bills.component';
import { PaymentSuccessComponent } from './payment/payment-success/payment-success.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentReceiptComponent } from './payment-receipt/payment-receipt.component';
import { TransactionComponent } from './transaction/transaction.component'; // Import MatDialogModule

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { CashComponent } from './payment/cash/cash.component';

import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    BillingComponent,
    SidebarComponent,
    PaymentComponent,
    PaymentOptionComponent,
    UpiComponent,
    CardComponent,
    NetbankingComponent,
    PaidBillsComponent,
    PaymentSuccessComponent,
    InvoiceComponent,
    PaymentReceiptComponent,
    TransactionComponent,
    CashComponent
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
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
