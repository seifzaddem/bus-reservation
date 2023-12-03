import {Component, Input, OnInit} from '@angular/core';
import {catchError, EMPTY, Observable, Subject, switchMap, tap} from 'rxjs';
import {CityModel} from '../../model/city.model';
import {JourneyModel, ReservedJourneyModel} from '../../model/journey.model';
import {CityService} from '../../service/city.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JourneyService} from '../../service/journey.service';
import {SearchJourneyModel} from '../../model/reservation.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ClientModel} from '../../model/client.model';

@UntilDestroy()
@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {


  cities$: Observable<CityModel[]>;
  searchJourney$ = new Subject<void>();
  updateJourney$ = new Subject<ReservedJourneyModel>();
  journeys: JourneyModel[];
  searchJourneyModel: SearchJourneyModel;
  seats: number;

  @Input()
  client: ClientModel;

  constructor(private cityService: CityService,
              private snackBar: MatSnackBar,
              private journeyService: JourneyService) {
  }

  ngOnInit(): void {
    this.cities$ = this.cityService.getCities();

    this.searchJourney$.pipe(
      switchMap(() => this.journeyService.getJourneysBySearchCriteria(this.searchJourneyModel)),
      tap(journeys => {
        this.journeys = journeys;
        this.seats = this.searchJourneyModel.seats;
        if (journeys.length == 0) {
          this.snackBar.open("Plus de bus disponibles à cette date", "X", {
            horizontalPosition: "right",
            verticalPosition: "top",
          })
        }
      }),
      catchError(() => {
        return EMPTY;
      }),
      untilDestroyed(this)
    ).subscribe();

    this.updateJourney$.pipe(
      switchMap(reservedJourneyModel => this.journeyService.updateJourney(reservedJourneyModel)),
      tap(() => this.searchJourney$.next()),
      catchError(() => {
        return EMPTY;
      })
    ).subscribe();

  }

  searchJourney(searchJourneyModel: SearchJourneyModel) {
    this.searchJourneyModel = searchJourneyModel;
    this.searchJourney$.next();
  }

  reserveJourney(reservedJourneyModel: ReservedJourneyModel) {
    this.updateJourney$.next(reservedJourneyModel);
  }

}
