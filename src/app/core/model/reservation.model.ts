import {JourneyModel} from './journey.model';
import {CityModel} from './city.model';

export interface ReservationModel {
  id: string;
  journeys: JourneyModel[];
  clientId: number;
  seatsReserved: SeatsReserved[];
  status: Status;
}

export interface SeatsReserved {
  journey: JourneyModel;
  seats: number;
}

export interface SearchJourneyModel {
  departure: CityModel;
  arrival: CityModel;
  seats: number;
  date: Date;
}

export type Status = 'PAID' | 'UNPAID';
