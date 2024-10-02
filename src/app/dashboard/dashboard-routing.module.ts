import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { BillingComponent } from './billing/billing.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { PaymentComponent } from './payment/payment.component';
import { PaidBillsComponent } from './paid-bills/paid-bills.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path: '', 
    component: DashboardHomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'profile', component: BillingComponent },
      { path: 'bills', component: BillingComponent },
      {path:'paidbills', component : PaidBillsComponent},
      { path: 'payment/:billId', component: PaymentComponent },
      { path: 'invoice/:billId', component: InvoiceComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
