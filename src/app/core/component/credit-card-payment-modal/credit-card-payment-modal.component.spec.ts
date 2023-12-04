import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditCardPaymentModalComponent} from './credit-card-payment-modal.component';
import {ReservationModelModalWrapper} from '../../model/reservation.model';
import {SAMPLE_UNPAID_RESERVATION_MODEL} from '../../../testing/reservation.constant';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PaypalPaymentModalComponent} from '../paypal-payment-modal/paypal-payment-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ReactiveFormsModule} from '@angular/forms';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('CreditCardPaymentModalComponent', () => {
  let component: CreditCardPaymentModalComponent;
  let fixture: ComponentFixture<CreditCardPaymentModalComponent>;
  const matDialogData: ReservationModelModalWrapper = {
    reservationModel: SAMPLE_UNPAID_RESERVATION_MODEL
  };

  const dialogRef: SpyObj<MatDialogRef<PaypalPaymentModalComponent, unknown>> = createSpyObj('MatDialogRef', ['close', 'open', 'afterClosed']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditCardPaymentModalComponent],
      imports: [MatSnackBarModule, ReactiveFormsModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: matDialogData},
        {provide: MatDialogRef, useValue: dialogRef}]
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
