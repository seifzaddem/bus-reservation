import {Component, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter} from '@angular/material/core';
import {JourneyService} from './core/service/journey.service';
import {ReservationService} from './core/service/reservation.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {tap} from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter
    }
  ]

})
export class AppComponent implements OnInit {

  constructor(private journeyService: JourneyService,
              private reservationService: ReservationService) {
  }
  
  ngOnInit(): void {

    this.journeyService.getJourneys().pipe(
      tap(journeys => localStorage.setItem("journeys", JSON.stringify(journeys))),
      untilDestroyed(this)
    ).subscribe();

    this.reservationService.getReservations().pipe(
      tap(reservations => localStorage.setItem("reservations", JSON.stringify(reservations))),
      untilDestroyed(this)
    ).subscribe();

  }

}
