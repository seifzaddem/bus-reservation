import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {ReservationModel, Status} from '../model/reservation.model';
import {ReservedJourneyModel} from '../model/journey.model';
import {JsonParserService} from '../../shared/service/json-parser.service';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public unpaidReservationsNotification$ = new Subject<void>();
  private apiUrl = 'assets/reservation.json';

  constructor(private http: HttpClient,
              private jsonParserService: JsonParserService) {
  }

  getReservations(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(this.apiUrl);
  }

  addReservation(reservedJourneyModel: ReservedJourneyModel, clientId: number): Observable<void> {
    let unparsedReservations = localStorage.getItem("reservations");
    const reservations: ReservationModel[] = this.jsonParserService.parseString(unparsedReservations);
    let currentReservation = reservations.find(reservationModel =>
      reservationModel.status == 'UNPAID' && reservationModel.clientId == clientId);
    if (!currentReservation) {
      currentReservation = {
        id: uuid(),
        journeys: [reservedJourneyModel.journey],
        clientId: clientId,
        seatsReserved: [{
          journey: reservedJourneyModel.journey,
          seats: reservedJourneyModel.seats
        }],
        status: 'UNPAID'
      };
      reservations.push(currentReservation);
    } else {
      currentReservation.journeys.push(reservedJourneyModel.journey);
      currentReservation.seatsReserved.push({
        journey: reservedJourneyModel.journey,
        seats: reservedJourneyModel.seats
      });
    }
    localStorage.setItem("reservations", JSON.stringify(reservations));

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
