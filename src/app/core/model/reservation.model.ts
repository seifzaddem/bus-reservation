import {ReservedJourneyModel} from './journey.model';
import {CityModel} from './city.model';

export interface ReservationModel {
  id: string;
  reservedJourneys: ReservedJourneyModel[];
  clientId: number;
  status: Status;
}

export interface SearchJourneyModel {
  departure: CityModel;
  arrival: CityModel;
  seats: number;
  date: Date;
}

export type Status = 'PAID' | 'UNPAID';
