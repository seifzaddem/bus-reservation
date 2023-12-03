import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalPaymentModalComponent } from './paypal-payment-modal.component';

describe('PaypalPaymentModalComponent', () => {
  let component: PaypalPaymentModalComponent;
  let fixture: ComponentFixture<PaypalPaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalPaymentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
