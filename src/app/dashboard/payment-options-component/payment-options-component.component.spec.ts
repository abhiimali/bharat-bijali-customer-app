import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOptionsComponentComponent } from './payment-options-component.component';

describe('PaymentOptionsComponentComponent', () => {
  let component: PaymentOptionsComponentComponent;
  let fixture: ComponentFixture<PaymentOptionsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentOptionsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
