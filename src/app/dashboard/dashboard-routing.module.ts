import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { BillingComponent } from './billing/billing.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';

const routes: Routes = [
  {
    path: '', 
    component: DashboardHomeComponent,
    canActivate: [AuthenticationGuard],
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
