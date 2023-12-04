import {BillModel} from '../core/model/bill.model';
import {SAMPLE_PAID_RESERVATION_MODEL} from './reservation.constant';

export const SAMPLE_BILL_CARD: BillModel = {
  id: "1",
  reservation: SAMPLE_PAID_RESERVATION_MODEL,
  paymentMethod: 'CARD'
}

export const SAMPLE_BILL_PAYPAL: BillModel = {
  id: "2",
  reservation: SAMPLE_PAID_RESERVATION_MODEL,
  paymentMethod: 'PAYPAL'
}
