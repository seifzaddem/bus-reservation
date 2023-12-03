import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardPaymentModalComponent } from './credit-card-payment-modal.component';

describe('CreditCardPaymentModalComponent', () => {
  let component: CreditCardPaymentModalComponent;
  let fixture: ComponentFixture<CreditCardPaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardPaymentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
