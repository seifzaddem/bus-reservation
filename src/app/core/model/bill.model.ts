import {ReservationModel} from './reservation.model';

export interface BillModel {
  id?: string;
  reservation: ReservationModel;
  paymentMethod: PaymentMethod;
}

export type PaymentMethod = 'CARD' | 'PAYPAL';

export interface CardPayment {
  cardNumber: string;
  expirationDate: string;
}
