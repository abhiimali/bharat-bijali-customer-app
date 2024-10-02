// payment-success.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-success',
  template: `
    <div class="payment-success">
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .payment-success {
      background-color: #d4edda;
      color: #155724;
      padding: 20px;
      border: 1px solid #c3e6cb;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class PaymentSuccessComponent {
  @Input() message: string = '';
}
