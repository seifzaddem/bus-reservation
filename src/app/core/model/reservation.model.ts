import {JourneyModel} from './journey.model';

export interface ReservationModel {
  id: number;
  journeys: JourneyModel[];
  clientId: number;
  seatsReserved: SeatsReserved[];
}

export interface SeatsReserved {
  journeyId: number;
  seats: number;
}

export interface AddReservationModel {
  departure: string;
  arrival: string;
  passenger: number;
  date: Date;
}
