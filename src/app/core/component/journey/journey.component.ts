import {Component, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {CityModel} from '../../model/city.model';
import {JourneyModel} from '../../model/journey.model';
import {CityService} from '../../service/city.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JourneyService} from '../../service/journey.service';
import {SearchJourneyModel} from '../../model/reservation.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

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
              private snackBar: MatSnackBar,
              private journeyService: JourneyService) {
  }

  ngOnInit(): void {
    this.cities$ = this.cityService.getCities();
  }

  searchJourney(searchJourneyModel: SearchJourneyModel) {
    this.journeyService.getJourneysBySearchCriteria(searchJourneyModel).pipe(
      tap(journeys => {
        this.journeys = journeys;
        if (journeys.length == 0) {
          this.snackBar.open("Pas de bus disponibles à cette date", "X", {
            horizontalPosition: "right",
            verticalPosition: "top",
          })
        }
      }),
      untilDestroyed(this)
    ).subscribe();
  }

}
