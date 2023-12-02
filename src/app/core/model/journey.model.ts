import {BusModel} from './bus.model';

export interface JourneyModel {
  id: number;
  bus: BusModel;
  departure: string;
  arrival: string;
  date: Date;
  price: string;
}
