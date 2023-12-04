import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationComponent} from './reservation.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BillService} from '../../service/bill.service';
import {JourneyService} from '../../service/journey.service';
import {ReservationService} from '../../service/reservation.service';
import {SAMPLE_CLIENT} from '../../../testing/client.constant';
import {of} from 'rxjs';
import {SAMPLE_BILL_CARD, SAMPLE_BILL_PAYPAL} from '../../../testing/bill.constant';
import {SAMPLE_UNPAID_RESERVATION_MODEL} from '../../../testing/reservation.constant';
import {SAMPLE_RESERVED_JOURNEY_MODEL} from '../../../testing/journey.constant';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;
  let dialogSpy: SpyObj<MatDialog>;
  let billServiceSpy: SpyObj<BillService>;
  let journeyServiceSpy: SpyObj<JourneyService>;
  let reservationServiceSpy: SpyObj<ReservationService>;
  const dialogRef: SpyObj<MatDialogRef<any, unknown>> = createSpyObj('MatDialogRef', ['close', 'open', 'afterClosed']);

  beforeEach(async () => {
    dialogSpy = createSpyObj<MatDialog>(['open']);
    dialogSpy.open.and.returnValue(dialogRef);
    billServiceSpy = createSpyObj<BillService>(['createBill', 'getBillsByClient']);
    journeyServiceSpy = createSpyObj<JourneyService>(['notifyJourney']);
    reservationServiceSpy = createSpyObj<ReservationService>(['updateReservation', 'getReservationsByStatus', 'deleteReservedJourney', 'getUnpaidReservationsNotification']);
    reservationServiceSpy.getUnpaidReservationsNotification.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      declarations: [ReservationComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: MatDialog, useValue: dialogSpy},
        {provide: ReservationService, useValue: reservationServiceSpy},
        {provide: BillService, useValue: billServiceSpy},
        {provide: JourneyService, useValue: journeyServiceSpy}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    component.client = SAMPLE_CLIENT;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load bills on initialization', () => {
    const bills = [SAMPLE_BILL_CARD, SAMPLE_BILL_PAYPAL];
    billServiceSpy.getBillsByClient.and.returnValue(of(bills));

    component.ngOnInit();

    expect(billServiceSpy.getBillsByClient).toHaveBeenCalledWith(SAMPLE_CLIENT);
    expect(component.bills).toEqual(bills);
  });

  it('should update reservation and load unpaid reservations on updateReservation$', () => {
    reservationServiceSpy.updateReservation.and.returnValue(of(null));

    component.updateReservation$.next();

    expect(reservationServiceSpy.updateReservation).toHaveBeenCalledWith(component.reservation);
    expect(reservationServiceSpy.getReservationsByStatus).toHaveBeenCalledWith('UNPAID', SAMPLE_CLIENT.id);
  });

  it('should update reservation on successful credit card payment', () => {
    component.reservation = SAMPLE_UNPAID_RESERVATION_MODEL;
    const bills = [SAMPLE_BILL_CARD, SAMPLE_BILL_PAYPAL];
    dialogRef.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRef);
    billServiceSpy.getBillsByClient.and.returnValue(of(bills));
    billServiceSpy.createBill.and.returnValue(of(null));
    reservationServiceSpy.updateReservation.and.returnValue(of(null));
    reservationServiceSpy.getReservationsByStatus.and.returnValue(of([SAMPLE_UNPAID_RESERVATION_MODEL]));

    component.openCreditCardPaymentModal();

    expect(component.reservation.status).toBe('PAID');
    expect(billServiceSpy.createBill).toHaveBeenCalledWith({
      reservation: component.reservation,
      paymentMethod: 'CARD'
    });
    expect(reservationServiceSpy.updateReservation).toHaveBeenCalledWith(component.reservation);
  });

  it('should update reservation on successful paypal payment', () => {
    const bills = [SAMPLE_BILL_CARD, SAMPLE_BILL_PAYPAL];
    component.reservation = SAMPLE_UNPAID_RESERVATION_MODEL;
    dialogRef.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRef);
    billServiceSpy.createBill.and.returnValue(of(null));
    billServiceSpy.getBillsByClient.and.returnValue(of(bills));
    reservationServiceSpy.updateReservation.and.returnValue(of(null));
    reservationServiceSpy.getReservationsByStatus.and.returnValue(of([SAMPLE_UNPAID_RESERVATION_MODEL]));

    component.openPaypalPaymentModal();

    expect(component.reservation.status).toBe('PAID');
    expect(billServiceSpy.createBill).toHaveBeenCalledWith({
      reservation: {
        ...component.reservation,
        totalPrice: component.reservation.totalPrice -= component.reservation.totalPrice * 0.05
      },
      paymentMethod: 'PAYPAL'
    });
    expect(reservationServiceSpy.updateReservation).toHaveBeenCalled();
  });

  it('should delete journey and update reservations', () => {
    const reservedJourneyModel = SAMPLE_RESERVED_JOURNEY_MODEL;
    reservationServiceSpy.deleteReservedJourney.and.returnValue(of(null));

    component.deleteJourney(reservedJourneyModel);

    expect(reservationServiceSpy.deleteReservedJourney).toHaveBeenCalledWith(reservedJourneyModel);
  });

});
