import {JourneyModel} from './journey.model';
import {CityModel} from './city.model';

export interface ReservationModel {
  id: number;
  journeys: JourneyModel[];
  clientId: number;
  seatsReserved: SeatsReserved[];
}

export interface SeatsReserved {
  journey: JourneyModel;
  seats: number;
}

export interface SearchReservationModel {
  departure: CityModel;
  arrival: CityModel;
  seats: number;
  date: Date;
}
