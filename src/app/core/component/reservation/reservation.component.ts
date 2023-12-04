import {Component, Input, OnInit} from '@angular/core';
import {ClientModel} from '../../model/client.model';
import {MatDialog} from '@angular/material/dialog';
import {CreditCardPaymentModalComponent} from '../credit-card-payment-modal/credit-card-payment-modal.component';
import {catchError, EMPTY, Subject, switchMap, tap} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {PaypalPaymentModalComponent} from '../paypal-payment-modal/paypal-payment-modal.component';
import {ReservationModel} from '../../model/reservation.model';
import {ReservationService} from '../../service/reservation.service';
import {BillModel} from '../../model/bill.model';
import {BillService} from '../../service/bill.service';
import {PaidJourneyWrapper, ReservedJourneyModel} from '../../model/journey.model';
import {JourneyService} from '../../service/journey.service';
import {PaidJourneyModalComponent} from '../paid-journey-modal/paid-journey-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  @Input()
  client: ClientModel;
  public reservation: ReservationModel;
  public bills: BillModel[];
  createBill$ = new Subject<BillModel>();
  loadBills$ = new Subject<void>();
  updateReservation$ = new Subject<void>();
  loadUnpaidReservations$ = new Subject<void>();

  constructor(private reservationService: ReservationService,
              private billService: BillService,
              private journeyService: JourneyService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {

    this.loadBills$.pipe(
      switchMap(() => this.billService.getBillsByClient(this.client)),
      tap(bills => this.bills = bills),
      untilDestroyed(this)
    ).subscribe();

    this.loadBills$.next();

    this.updateReservation$.pipe(
      switchMap(() => this.reservationService.updateReservation(this.reservation)),
      tap(() => this.loadUnpaidReservations$.next()),
      catchError(() => {
        return EMPTY;
      }),
      untilDestroyed(this)
    ).subscribe();

    this.loadUnpaidReservations$.pipe(
      switchMap(() => this.reservationService.getReservationsByStatus('UNPAID', this.client.id)),
      tap(reservations => {
        // We get the first element as we consider that there is only one unpaid reservation and each journey adds up to the current reservation
        if (reservations.length != 0) {
          this.reservation = reservations[0];
          this.reservation.totalPrice = this.calculateTotalPrice();
        } else {
          this.reservation = null;
        }
      }),
      catchError(() => {
        return EMPTY;
      }),
      untilDestroyed(this)
    ).subscribe();

    this.loadUnpaidReservations$.next();

    this.reservationService.getUnpaidReservationsNotification().pipe(
      tap(() => this.loadUnpaidReservations$.next()),
      untilDestroyed(this)
    ).subscribe();

    this.createBill$.pipe(
      switchMap(billModel => this.billService.createBill(billModel)),
    ).subscribe();
  }

  openCreditCardPaymentModal() {
    this.matDialog.open(CreditCardPaymentModalComponent, {
      width: '50%',
      height: '50%',
      data: {
        reservationModel: this.reservation
      }
    }).afterClosed().pipe(
      tap(value => {
        if (value) {
          this.reservation.status = 'PAID';
          this.createBill$.next({
            reservation: this.reservation,
            paymentMethod: 'CARD'
          });
          this.loadBills$.next();
          this.updateReservation$.next();
        }
      }),
      untilDestroyed(this)
    ).subscribe();
  }

  openPaypalPaymentModal() {
    this.matDialog.open(PaypalPaymentModalComponent, {
      width: '50%',
      height: '50%',
      data: {
        reservationModel: {
          ...this.reservation,
          totalPrice: this.reservation.totalPrice - (this.reservation.totalPrice * 0.05)
        }
      }
    }).afterClosed().pipe(
      tap(value => {
        if (value) {
          this.reservation.status = 'PAID';
          this.reservation.totalPrice -= (this.reservation.totalPrice * 0.05);
          this.createBill$.next({
            reservation: this.reservation,
            paymentMethod: 'PAYPAL'
          });
          this.loadBills$.next();
          this.updateReservation$.next();
        }
      }),
      untilDestroyed(this)
    ).subscribe();
  }

  deleteJourney(reservedJourneyModel: ReservedJourneyModel) {
    this.reservationService.deleteReservedJourney(reservedJourneyModel).pipe(
      tap(() => {
        this.loadUnpaidReservations$.next();
        this.journeyService.notifyJourney();
      }),
      untilDestroyed(this)
    ).subscribe();
  }

  calculateTotalPrice(): number {
    return this.reservation ? this.reservation?.reservedJourneys.reduce((total, reservedJourney) => {
      total += reservedJourney.journey.price * reservedJourney.seats;
      return total;
    }, 0) : 0;
  }

  openPaidJourneysModal(paidJourneyWrapper: PaidJourneyWrapper) {
    this.matDialog.open(PaidJourneyModalComponent, {
      width: '50%',
      height: '50%',
      data: {
        reservedJourneys: paidJourneyWrapper.reservedJourneys,
        totalPrice: paidJourneyWrapper.totalPrice
      }
    })
  }
}
