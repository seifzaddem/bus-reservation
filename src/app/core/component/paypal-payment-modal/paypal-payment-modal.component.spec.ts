import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaypalPaymentModalComponent} from './paypal-payment-modal.component';
import {ReservationModelModalWrapper} from '../../model/reservation.model';
import {SAMPLE_UNPAID_RESERVATION_MODEL} from '../../../testing/reservation.constant';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PaypalPaymentModalComponent', () => {
  let component: PaypalPaymentModalComponent;
  let fixture: ComponentFixture<PaypalPaymentModalComponent>;
  const matDialogData: ReservationModelModalWrapper = {
    reservationModel: SAMPLE_UNPAID_RESERVATION_MODEL
  };

  const dialogRef: SpyObj<MatDialogRef<PaypalPaymentModalComponent, unknown>> = createSpyObj('MatDialogRef', ['close', 'open', 'afterClosed']);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [PaypalPaymentModalComponent],
      imports: [MatSnackBarModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: matDialogData},
        {provide: MatDialogRef, useValue: dialogRef}]
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
