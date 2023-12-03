import {Injectable} from '@angular/core';
import {CardPayment} from '../model/bill.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() {
  }

  payByCard(cardPayment: CardPayment): Observable<any> {
    // Payment by card logic
    return of(null);
  }

  payByPaypal(mail: string): Observable<any> {
    // Payment by PayPal logic
    return of(null);
  }
}
