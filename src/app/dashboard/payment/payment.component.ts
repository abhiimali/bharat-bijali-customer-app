import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
 
  selectedPaymentOption: string | null = null;

  selectPaymentOption(option: string) {
    this.selectedPaymentOption = option;
  }

  billId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.billId = +params.get('billId')!;
    });
  }


}
