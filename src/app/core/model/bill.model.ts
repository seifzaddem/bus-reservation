import {ReservationModel} from './reservation.model';

export interface BillModel {
  reservation: ReservationModel;
  paymentMethod: PaymentMethod;
}

export enum PaymentMethod {
  CARD = "CARD",
  PAYPAL = "PAYPAL"
}
