import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { BillingComponent } from './billing/billing.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { PaymentComponent } from './payment/payment.component';
import { PaidBillsComponent } from './paid-bills/paid-bills.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentReceiptComponent } from './payment-receipt/payment-receipt.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path: '', 
    component: DashboardHomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'bills', pathMatch: 'full' },
      { path: 'profile', component: BillingComponent },
      { path: 'bills', component: BillingComponent },
      {path:'paidbills', component : PaidBillsComponent},
      { path: 'payment/:billId', component: PaymentComponent },
      { path: 'invoice/:billId', component: InvoiceComponent },
      { path: 'payment-receipt/:billId', component: PaymentReceiptComponent },
      {path : 'transactions' , component : TransactionComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
