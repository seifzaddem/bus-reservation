import {Component, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {CityModel} from '../../model/city.model';
import {CityService} from '../../service/city.service';
import {SearchReservationModel} from '../../model/reservation.model';
import {JourneyService} from '../../service/journey.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  cities$: Observable<CityModel[]>;

  constructor(private cityService: CityService,
              private journeyService: JourneyService) {
  }

  ngOnInit(): void {
    this.cities$ = this.cityService.getCities();
  }

  searchReservation(searchReservationModel: SearchReservationModel) {
    this.journeyService.getJourneysBySearchCriteria(searchReservationModel).pipe(
      tap(journeys => {
      }),
      untilDestroyed(this)
    ).subscribe();
  }

}
