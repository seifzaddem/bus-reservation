import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReservationModel} from '../../model/reservation.model';
import {ReservedJourneyModel} from '../../model/journey.model';

@Component({
  selector: 'app-pending-reservation',
  templateUrl: './unpaid-reservation.component.html',
  styleUrls: ['./unpaid-reservation.component.scss']
})
export class UnpaidReservationComponent implements OnInit {

  @Input()
  public reservation: ReservationModel;
  displayedColumns = ["departure", "arrival", "date", "pricePerSeat", "seats", "totalPrice", "delete"];

  @Output()
  OnDeleteJourney = new EventEmitter<ReservedJourneyModel>();
  @Output()
  onCreditCardPayment = new EventEmitter<void>();
  @Output()
  onPaypalPayment = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {

  }

  deleteJourney(reservedJourneyModel: ReservedJourneyModel) {
    this.OnDeleteJourney.emit(reservedJourneyModel);
  }


  areJourneysReserved(): boolean {
    return this.reservation?.reservedJourneys != undefined && this.reservation.reservedJourneys.length != 0;
  }

  openCreditCardPaymentModal() {
    this.onCreditCardPayment.emit();
  }

  openPaypalPaymentModal() {
    this.onPaypalPayment.emit();
  }
}
