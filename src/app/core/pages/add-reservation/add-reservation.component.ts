import {Component, OnInit} from '@angular/core';
import {CityService} from '../../service/city.service';
import {CityModel} from '../../model/city.model';
import {UntilDestroy} from '@ngneat/until-destroy';
import {Observable, tap} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddReservationModel} from '../../model/add-reservation.model';


@UntilDestroy()
@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {

  cities$: Observable<CityModel[]>;
  cities: CityModel[] = [];
  form: FormGroup;
  readonly DEPARTURE_FORM_KEY: keyof AddReservationModel = 'departure';
  readonly ARRIVAL_FORM_KEY: keyof AddReservationModel = 'arrival';
  readonly DATE_FORM_KEY: keyof AddReservationModel = 'date';
  readonly PASSENGER_FORM_KEY: keyof AddReservationModel = 'passenger'

  constructor(private cityService: CityService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        [this.DEPARTURE_FORM_KEY]: this.formBuilder.control(null),
        [this.ARRIVAL_FORM_KEY]: this.formBuilder.control(null),
        [this.DATE_FORM_KEY]: this.formBuilder.control(new Date()),
        [this.PASSENGER_FORM_KEY]: this.formBuilder.control(1)
      }
    );

    this.cities$ = this.cityService.getCities().pipe(
      tap(cities => this.cities = cities)
    );
  }

}
