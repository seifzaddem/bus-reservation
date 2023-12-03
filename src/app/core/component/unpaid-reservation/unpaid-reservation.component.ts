import {Component, Input, OnInit} from '@angular/core';
import {ReservationService} from '../../service/reservation.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ReservationModel} from '../../model/reservation.model';
import {ClientModel} from '../../model/client.model';
import {catchError, EMPTY, Subject, switchMap, tap} from 'rxjs';
import {ReservedJourneyModel} from '../../model/journey.model';
import {JourneyService} from '../../service/journey.service';
import {MatDialog} from '@angular/material/dialog';
import {CreditCardPaymentModalComponent} from '../credit-card-payment-modal/credit-card-payment-modal.component';
import {BillService} from '../../service/bill.service';
import {BillModel} from '../../model/bill.model';
import {PaypalPaymentModalComponent} from '../paypal-payment-modal/paypal-payment-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-pending-reservation',
  templateUrl: './unpaid-reservation.component.html',
  styleUrls: ['./unpaid-reservation.component.scss']
})
export class UnpaidReservationComponent implements OnInit {

  public reservation: ReservationModel;
  reloadUnpaidReservations$ = new Subject<void>();
  updateReservation$ = new Subject<void>();
  createBill$ = new Subject<BillModel>();
  @Input()
  client: ClientModel;
  displayedColumns = ["departure", "arrival", "date", "pricePerSeat", "seats", "totalPrice", "delete"];

  constructor(private reservationService: ReservationService,
              private billService: BillService,
              private matDialog: MatDialog,
              private journeyService: JourneyService) {
  }

  ngOnInit(): void {

    this.updateReservation$.pipe(
      switchMap(() => this.reservationService.updateReservation(this.reservation)),
      tap(() => this.reloadUnpaidReservations$.next()),
      catchError(() => {
        return EMPTY;
      }),
      untilDestroyed(this)
    ).subscribe();

    this.reloadUnpaidReservations$.pipe(
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

    this.reloadUnpaidReservations$.next();

    this.reservationService.getUnpaidReservationsNotification().pipe(
      tap(() => this.reloadUnpaidReservations$.next()),
      untilDestroyed(this)
    ).subscribe();

    this.createBill$.pipe(
      switchMap(billModel => this.billService.createBill(billModel)),
    ).subscribe();
  }

  deleteJourney(reservedJourneyModel: ReservedJourneyModel) {
    this.reservationService.deleteReservedJourney(reservedJourneyModel).pipe(
      tap(() => {
        this.reloadUnpaidReservations$.next();
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
          this.updateReservation$.next();
        }
      }),
      untilDestroyed(this)
    ).subscribe();
  }


  areJourneysReserved(): boolean {
    return this.reservation?.reservedJourneys != undefined && this.reservation.reservedJourneys.length != 0;
  }
}
