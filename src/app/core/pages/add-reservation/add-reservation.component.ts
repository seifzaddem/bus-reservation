import {Component, OnInit} from '@angular/core';
import {CityService} from '../../service/city.service';
import {CityModel} from '../../model/city.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Observable, tap} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddReservationModel} from '../../model/reservation.model';


@UntilDestroy()
@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {

  cities$: Observable<CityModel[]>;
  cities: CityModel[] = [];
  departureCities: CityModel[] = [];
  arrivalCities: CityModel[] = [];
  form: FormGroup;
  numbers: number[] = [1, 2, 3, 4, 5];


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
        [this.DATE_FORM_KEY]: this.formBuilder.control(null),
        [this.PASSENGER_FORM_KEY]: this.formBuilder.control(1)
      }
    );

    this.cities$ = this.cityService.getCities().pipe(
      tap(cities => {
        this.cities = cities;
        this.arrivalCities = cities;
        this.departureCities = cities;
      })
    );

    this.form.get(this.DEPARTURE_FORM_KEY).valueChanges.pipe(
      tap(departureCity => {
        this.arrivalCities = this.cities.filter(city => city?.name != departureCity?.name);
      }),
      untilDestroyed(this)
    ).subscribe();

    this.form.get(this.ARRIVAL_FORM_KEY).valueChanges.pipe(
      tap(arrivalCity => {
        this.departureCities = this.cities.filter(city => city?.name != arrivalCity?.name);
      }),
      untilDestroyed(this)
    ).subscribe();

  }

  switchCities() {
    const departureCity = this.form.get(this.DEPARTURE_FORM_KEY)?.value;
    this.form.get(this.DEPARTURE_FORM_KEY)?.setValue(this.form.get(this.ARRIVAL_FORM_KEY)?.value);
    this.form.get(this.ARRIVAL_FORM_KEY)?.setValue(departureCity);

  }

  search() {

  }
}
