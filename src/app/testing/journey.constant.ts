import {JourneyModel, ReservedJourneyModel} from '../core/model/journey.model';
import {SAMPLE_CITY_MARSEILLE, SAMPLE_CITY_PARIS} from './city.constant';
import {SAMPLE_BUS} from './bus.constant';
import {SearchJourneyModel} from '../core/model/reservation.model';

export const SAMPLE_JOURNEY_MODEL: JourneyModel = {
  id: 1,
  departure: SAMPLE_CITY_PARIS,
  arrival: SAMPLE_CITY_MARSEILLE,
  bus: SAMPLE_BUS,
  date: new Date("2024-07-11T06:00:00+02:00"),
  availableSeats: 30,
  price: 37
};

export const SAMPLE_SEARCH_JOURNEY_MODEL: SearchJourneyModel = {
  seats: 1,
  departure: SAMPLE_CITY_PARIS,
  arrival: SAMPLE_CITY_MARSEILLE,
  date: new Date("2024-07-11T06:00:00+02:00")
};


export const SAMPLE_RESERVED_JOURNEY_MODEL: ReservedJourneyModel = {
  id: "1",
  journey: SAMPLE_JOURNEY_MODEL,
  seats: 2,
  clientId: 1
};
