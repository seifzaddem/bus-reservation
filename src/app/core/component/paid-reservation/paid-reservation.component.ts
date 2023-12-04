import {Component, Input} from '@angular/core';
import {BillModel} from '../../model/bill.model';

@Component({
  selector: 'app-paid-reservation',
  templateUrl: './paid-reservation.component.html',
  styleUrls: ['./paid-reservation.component.scss']
})
export class PaidReservationComponent {

  @Input()
  bills: BillModel[];
  displayedColumns = ["id", "totalPrice", "paymentMethod"];

  constructor() {
  }

}
