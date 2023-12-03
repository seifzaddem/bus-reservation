import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {JourneyModel, ReservedJourneyModel} from '../model/journey.model';
import {SearchJourneyModel} from '../model/reservation.model';
import {JsonParserService} from '../../shared/service/json-parser.service';
import {haveSameDay} from '../../shared/util/date.util';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  public journeyNotification$ = new Subject<void>();
  private apiUrl = 'assets/journey.json';

  constructor(private http: HttpClient,
              private jsonParserService: JsonParserService) {
  }

  getJourneys(): Observable<JourneyModel[]> {
    return this.http.get<JourneyModel[]>(this.apiUrl);
  }

  getJourneysBySearchCriteria(searchReservationModel: SearchJourneyModel): Observable<JourneyModel[]> {
    let unparsedJourneys = localStorage.getItem("journeys");
    const parsedJourneys: JourneyModel[] = this.jsonParserService.parseString(unparsedJourneys);
    let journeys = parsedJourneys.filter(journeyModel =>
      journeyModel.departure.name == searchReservationModel.departure.name
      && journeyModel.arrival.name == searchReservationModel.arrival.name
      && haveSameDay(new Date(journeyModel.date), searchReservationModel.date)
      && journeyModel.availableSeats >= searchReservationModel.seats);
    return of(journeys);
  }

  updateJourney(reservedJourneyModel: ReservedJourneyModel): Observable<void> {
    let unparsedJourneys = localStorage.getItem("journeys");
    const journeys: JourneyModel[] = this.jsonParserService.parseString(unparsedJourneys);
    const correspondingJourney = journeys.find(journey => reservedJourneyModel.journey.id == journey.id);
    correspondingJourney.availableSeats -= reservedJourneyModel.seats;
    localStorage.setItem("journeys", JSON.stringify(journeys));
    return of(null);
  }

  notifyJourney(): void {
    this.journeyNotification$.next();
  }

  getJourneyNotification(): Observable<void> {
    return this.journeyNotification$.asObservable();
  }

}
