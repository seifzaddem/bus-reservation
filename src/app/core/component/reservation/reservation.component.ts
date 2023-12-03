import {Component, Input, OnInit} from '@angular/core';
import {ClientModel} from '../../model/client.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  @Input()
  client: ClientModel;
  
  constructor() {
  }

  ngOnInit(): void {
  }

}
