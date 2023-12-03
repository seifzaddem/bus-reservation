import {BusModel} from './bus.model';
import {CityModel} from './city.model';

export interface JourneyModel {
  id: number;
  bus: BusModel;
  departure: CityModel;
  arrival: CityModel;
  date: Date;
  price: number;
  availableSeats: number;
}

export interface ReservedJourneyModel {
  journey: JourneyModel;
  clientId: number;
  seats: number;
}
