import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {ReservationModel, Status} from '../model/reservation.model';
import {JourneyModel, ReservedJourneyModel} from '../model/journey.model';
import {JsonParserService} from '../../shared/service/json-parser.service';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public unpaidReservationsNotification$ = new Subject<void>();
  deleteJour
  private apiUrl = 'assets/reservation.json';

  constructor(private http: HttpClient,
              private jsonParserService: JsonParserService) {
  }

  getReservations(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(this.apiUrl);
  }

  addReservation(reservedJourneyModel: ReservedJourneyModel): Observable<void> {
    let unparsedReservations = localStorage.getItem("reservations");
    const reservations: ReservationModel[] = this.jsonParserService.parseString(unparsedReservations);
    let currentReservation = reservations.find(reservationModel =>
      reservationModel.status == 'UNPAID' && reservationModel.clientId == reservedJourneyModel.clientId);
    if (!currentReservation) {
      currentReservation = {
        id: uuid(),
        clientId: reservedJourneyModel.clientId,
        reservedJourneys: [reservedJourneyModel],
        status: 'UNPAID'
      };
      reservations.push(currentReservation);
    } else {
      currentReservation.reservedJourneys.push(reservedJourneyModel);
    }
    localStorage.setItem("reservations", JSON.stringify(reservations));

    return of(null);
  }

  deleteReservation(reservedJourneyModel: ReservedJourneyModel): Observable<void> {
    let unparsedReservations = localStorage.getItem("reservations");
    const reservations: ReservationModel[] = this.jsonParserService.parseString(unparsedReservations);
    let currentReservation = reservations.find(reservationModel =>
      reservationModel.status == 'UNPAID' && reservationModel.clientId == reservedJourneyModel.clientId);
    currentReservation.reservedJourneys = currentReservation.reservedJourneys
      .filter(reservedJourney => reservedJourney.id != reservedJourneyModel.id);

    localStorage.setItem("reservations", JSON.stringify(reservations));

    let unparsedJourneys = localStorage.getItem("journeys");
    const journeys: JourneyModel[] = this.jsonParserService.parseString(unparsedJourneys);
    const correspondingJourney = journeys.find(journey => reservedJourneyModel.journey.id == journey.id);
    correspondingJourney.availableSeats += reservedJourneyModel.seats;
    localStorage.setItem("journeys", JSON.stringify(journeys));

    return of(null);
  }

  getReservationsByStatus(status: Status, clientId: number): Observable<ReservationModel[]> {
    let unparsedReservations = localStorage.getItem("reservations");
    const reservations: ReservationModel[] = this.jsonParserService.parseString(unparsedReservations);
    const filteredReservations = reservations.filter(reservationModel =>
      reservationModel.status == status && reservationModel.clientId == clientId);
    return of(filteredReservations);
  }

  notifyUnpaidReservations(): void {
    this.unpaidReservationsNotification$.next();
  }

  getUnpaidReservationsNotification(): Observable<void> {
    return this.unpaidReservationsNotification$.asObservable();
  }

}
