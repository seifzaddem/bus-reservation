import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PaidJourneyWrapper} from '../../model/journey.model';

@Component({
  selector: 'app-paid-journey',
  templateUrl: './paid-journey-modal.component.html',
  styleUrls: ['./paid-journey-modal.component.scss']
})
export class PaidJourneyModalComponent implements OnInit {

  displayedColumns = ["departure", "arrival", "date", "pricePerSeat", "seats", "totalPrice"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: PaidJourneyWrapper) {
  }

  ngOnInit(): void {
  }

}
