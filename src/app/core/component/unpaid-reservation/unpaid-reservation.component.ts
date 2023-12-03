import {Component, Input, OnInit} from '@angular/core';
import {ReservationService} from '../../service/reservation.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ReservationModel} from '../../model/reservation.model';
import {ClientModel} from '../../model/client.model';
import {catchError, EMPTY, Subject, switchMap, tap} from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-pending-reservation',
  templateUrl: './unpaid-reservation.component.html',
  styleUrls: ['./unpaid-reservation.component.scss']
})
export class UnpaidReservationComponent implements OnInit {

  public reservation: ReservationModel;
  unpaidReservations$ = new Subject<void>();
  @Input()
  client: ClientModel;

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit(): void {

    this.unpaidReservations$.pipe(
      switchMap(() => this.reservationService.getReservationsByStatus('UNPAID', this.client.id)),
      tap(reservations => {
        // We get the first element as we consider that there is only one unpaid reservation and each journey adds up to the current reservation
        if (reservations.length != 0) {
          this.reservation = reservations[0];
        }
      }),
      catchError(() => {
        return EMPTY;
      }),
      untilDestroyed(this)
    ).subscribe();

    this.unpaidReservations$.next();

    this.reservationService.getUnpaidReservationsNotification().pipe(
      tap(() => this.unpaidReservations$.next()),
      untilDestroyed(this)
    ).subscribe();

  }

}