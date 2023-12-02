import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CityModel} from '../../model/city.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {tap} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchReservationModel} from '../../model/reservation.model';


@UntilDestroy()
@Component({
  selector: 'app-search-reservation',
  templateUrl: './search-reservation.component.html',
  styleUrls: ['./search-reservation.component.scss']
})
export class SearchReservationComponent implements OnInit {

  departureCities: CityModel[] = [];
  arrivalCities: CityModel[] = [];
  form: FormGroup;
  numbers: number[] = [1, 2, 3, 4, 5];
  readonly DEPARTURE_FORM_KEY: keyof SearchReservationModel = 'departure';
  readonly ARRIVAL_FORM_KEY: keyof SearchReservationModel = 'arrival';
  readonly DATE_FORM_KEY: keyof SearchReservationModel = 'date';
  readonly SEATS_FORM_KEY: keyof SearchReservationModel = 'seats'
  @Output()
  searchReservation = new EventEmitter<SearchReservationModel>();

  constructor(
    private formBuilder: FormBuilder) {
  }

  _cities: CityModel[] = [];

  @Input()
  set cities(cities: CityModel[]) {
    this._cities = cities;
    this.departureCities = cities;
    this.arrivalCities = cities;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        [this.DEPARTURE_FORM_KEY]: this.formBuilder.control(null, Validators.required),
        [this.ARRIVAL_FORM_KEY]: this.formBuilder.control(null, Validators.required),
        [this.DATE_FORM_KEY]: this.formBuilder.control(null, Validators.required),
        [this.SEATS_FORM_KEY]: this.formBuilder.control(1)
      }
    );

    this.form.get(this.DEPARTURE_FORM_KEY).valueChanges.pipe(
      tap(departureCity => {
        this.arrivalCities = this._cities.filter(city => city?.name != departureCity?.name);
      }),
      untilDestroyed(this)
    ).subscribe();

    this.form.get(this.ARRIVAL_FORM_KEY).valueChanges.pipe(
      tap(arrivalCity => {
        this.departureCities = this._cities.filter(city => city?.name != arrivalCity?.name);
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
    this.searchReservation.emit(this.form.value as SearchReservationModel)
  }
}
