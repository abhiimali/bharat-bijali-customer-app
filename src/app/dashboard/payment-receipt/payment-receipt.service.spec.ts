import { TestBed } from '@angular/core/testing';

import { PaymentReceiptService } from './payment-receipt.service';

describe('PaymentReceiptService', () => {
  let service: PaymentReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
