import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CityModel} from '../../model/city.model';
import {CityService} from '../../service/city.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  cities$: Observable<CityModel[]>;

  constructor(private cityService: CityService) {
  }

  ngOnInit(): void {
    this.cities$ = this.cityService.getCities();
  }

}
