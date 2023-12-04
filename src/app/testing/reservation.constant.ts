import {ReservationModel} from '../core/model/reservation.model';
import {SAMPLE_RESERVED_JOURNEY_MODEL} from './journey.constant';

export const SAMPLE_UNPAID_RESERVATION_MODEL: ReservationModel = {
  id: "1",
  clientId: 1,
  totalPrice: 55,
  status: 'UNPAID',
  reservedJourneys: [SAMPLE_RESERVED_JOURNEY_MODEL]
}

export const SAMPLE_PAID_RESERVATION_MODEL: ReservationModel = {
  id: "2",
  clientId: 1,
  totalPrice: 155,
  status: 'PAID',
  reservedJourneys: [SAMPLE_RESERVED_JOURNEY_MODEL]
}
