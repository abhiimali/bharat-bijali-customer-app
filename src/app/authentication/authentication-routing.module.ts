import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

const routes: Routes = [
  { path: '', component: SendOtpComponent }, // Main entry for authentication
  { path: 'send-otp', component: SendOtpComponent },
  { path: 'verify-otp/:customerId', component: VerifyOtpComponent },
  { path: '', redirectTo: '/authentication', pathMatch: 'full' }, // Redirect to authentication
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
