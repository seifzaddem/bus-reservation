import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {JourneyModel} from '../model/journey.model';
import {SearchJourneyModel} from '../model/reservation.model';
import {JsonParserService} from '../../shared/service/json-parser.service';
import {haveSameDay} from '../../shared/util/date.util';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

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
}
