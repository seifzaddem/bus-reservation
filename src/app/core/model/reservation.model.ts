import {ReservedJourneyModel} from './journey.model';
import {CityModel} from './city.model';

export interface ReservationModel {
  id: string;
  reservedJourneys: ReservedJourneyModel[];
  clientId: number;
  status: Status;
  totalPrice?: number;
}

export interface SearchJourneyModel {
  departure: CityModel;
  arrival: CityModel;
  seats: number;
  date: Date;
}

export interface ReservationModelModalWrapper {
  reservationModel: ReservationModel
}

export type Status = 'PAID' | 'UNPAID';
