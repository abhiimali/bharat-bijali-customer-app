import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  isPaymentModalOpen = false;
  selectedPaymentMethod: string | null = null;
  upiId: string = '';
  cardNumber: string = '';
  cardHolderName: string = '';
  cvv: string = '';
  expiryDate: string = '';
  netBankingUsername: string = '';
  netBankingPassword: string = '';

  openPaymentModal() {
    this.isPaymentModalOpen = true;
  }

  closePaymentModal() {
    this.isPaymentModalOpen = false;
    this.selectedPaymentMethod = null;
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  validateCardNumber() {
    // Only allow digits
    this.cardNumber = this.cardNumber.replace(/[^0-9]/g, '');
  }

  validateCVV() {
    // Only allow digits
    this.cvv = this.cvv.replace(/[^0-9]/g, '');
  }

  validateExpiry() {
    // Handle expiry date validation if needed
  }

  submitUPI() {
    // Implement UPI submission logic
  }

  submitCard() {
    // Implement Card submission logic
  }

  submitNetBanking() {
    // Implement Net Banking submission logic
  }

  settleInCash() {
    // Logic to handle cash settlement request
  }
}
