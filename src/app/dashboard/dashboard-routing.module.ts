import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { BillingComponent } from './billing/billing.component';

const routes: Routes = [
  {
    path: '', 
    component: DashboardHomeComponent,
    children: [
      { path: 'profile', component: BillingComponent },
      { path: 'bills', component: BillingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
