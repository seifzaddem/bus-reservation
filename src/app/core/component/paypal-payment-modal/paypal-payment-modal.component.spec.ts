import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaypalPaymentModalComponent} from './paypal-payment-modal.component';
import {ReservationModelModalWrapper} from '../../model/reservation.model';
import {SAMPLE_UNPAID_RESERVATION_MODEL} from '../../../testing/reservation.constant';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {PaymentService} from '../../service/payment.service';
import {of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PaypalPaymentModalComponent', () => {
  let component: PaypalPaymentModalComponent;
  let fixture: ComponentFixture<PaypalPaymentModalComponent>;
  const matDialogData: ReservationModelModalWrapper = {
    reservationModel: SAMPLE_UNPAID_RESERVATION_MODEL
  };

  let paymentServiceSpy: SpyObj<PaymentService>;
  const dialogRefSpy: SpyObj<MatDialogRef<PaypalPaymentModalComponent, unknown>> = createSpyObj('MatDialogRef', ['close', 'open', 'afterClosed']);

  beforeEach(async () => {

    paymentServiceSpy = createSpyObj<PaymentService>(['payByPaypal']);

    await TestBed.configureTestingModule({
      declarations: [PaypalPaymentModalComponent],
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: matDialogData},
        {provide: MatDialogRef, useValue: dialogRefSpy},
        {provide: PaymentService, useValue: paymentServiceSpy}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaypalPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute payment when executePayment is called', () => {
    component.mailControl.setValue('john.doe@gmail.com');

    paymentServiceSpy.payByPaypal.and.returnValue(of(null));

    component.executePayment();

    expect(paymentServiceSpy.payByPaypal).toHaveBeenCalledWith('john.doe@gmail.com');
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
