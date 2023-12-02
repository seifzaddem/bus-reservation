import {Component, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {CityModel} from '../../model/city.model';
import {CityService} from '../../service/city.service';
import {SearchJourneyModel} from '../../model/reservation.model';
import {JourneyService} from '../../service/journey.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {JourneyModel} from '../../model/journey.model';

@UntilDestroy()
@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {

  cities$: Observable<CityModel[]>;
  journeys: JourneyModel[];

  constructor(private cityService: CityService,
              private journeyService: JourneyService) {
  }

  ngOnInit(): void {
    this.cities$ = this.cityService.getCities();
  }

  searchJourney(searchJourneyModel: SearchJourneyModel) {
    this.journeyService.getJourneysBySearchCriteria(searchJourneyModel).pipe(
      tap(journeys => {
        this.journeys = journeys;
      }),
      untilDestroyed(this)
    ).subscribe();
  }

}
