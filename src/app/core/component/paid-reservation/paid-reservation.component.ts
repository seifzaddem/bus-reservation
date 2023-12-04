import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BillModel} from '../../model/bill.model';
import {PaidJourneyWrapper, ReservedJourneyModel} from '../../model/journey.model';

@Component({
  selector: 'app-paid-reservation',
  templateUrl: './paid-reservation.component.html',
  styleUrls: ['./paid-reservation.component.scss']
})
export class PaidReservationComponent {

  @Input()
  bills: BillModel[];
  displayedColumns = ["id", "totalPrice", "paymentMethod", "journeys"];

  @Output()
  onPaidJourneys = new EventEmitter<PaidJourneyWrapper>();

  constructor() {
  }

  openPaidJourneyModal(reservedJourneys: ReservedJourneyModel[], totalPrice: number) {
    this.onPaidJourneys.emit({reservedJourneys: reservedJourneys, totalPrice: totalPrice});
  }
}
