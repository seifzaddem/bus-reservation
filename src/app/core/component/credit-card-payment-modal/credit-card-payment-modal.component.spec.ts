import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditCardPaymentModalComponent} from './credit-card-payment-modal.component';
import {ReservationModelModalWrapper} from '../../model/reservation.model';
import {SAMPLE_UNPAID_RESERVATION_MODEL} from '../../../testing/reservation.constant';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PaypalPaymentModalComponent} from '../paypal-payment-modal/paypal-payment-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {PaymentService} from '../../service/payment.service';
import {of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('CreditCardPaymentModalComponent', () => {
  let component: CreditCardPaymentModalComponent;
  let fixture: ComponentFixture<CreditCardPaymentModalComponent>;
  const matDialogData: ReservationModelModalWrapper = {
    reservationModel: SAMPLE_UNPAID_RESERVATION_MODEL
  };

  let paymentServiceSpy: SpyObj<PaymentService>;
  const dialogRefSpy: SpyObj<MatDialogRef<PaypalPaymentModalComponent, unknown>> = createSpyObj('MatDialogRef', ['close', 'open', 'afterClosed']);

  beforeEach(async () => {

    paymentServiceSpy = createSpyObj<PaymentService>(['payByCard']);

    await TestBed.configureTestingModule({
      declarations: [CreditCardPaymentModalComponent],
      imports: [MatSnackBarModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: matDialogData},
        {provide: MatDialogRef, useValue: dialogRefSpy},
        {provide: PaymentService, useValue: paymentServiceSpy}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreditCardPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with controls', () => {
    expect(component.form.get(component.CARD_NUMBER_FORM_KEY)).toBeDefined();
    expect(component.form.get(component.EXPIRATION_DATE_FORM_KEY)).toBeDefined();
  });

  it('should execute payment when executePayment is called', () => {
    component.form.setValue({
      [component.CARD_NUMBER_FORM_KEY]: '123456789012',
      [component.EXPIRATION_DATE_FORM_KEY]: '12/25'
    });

    paymentServiceSpy.payByCard.and.returnValue(of(null));

    component.executePayment();

    expect(paymentServiceSpy.payByCard).toHaveBeenCalledWith({
      cardNumber: '123456789012',
      expirationDate: '12/25'
    });
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
