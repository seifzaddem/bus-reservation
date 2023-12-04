import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchJourneyComponent} from './search-journey.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {SAMPLE_CITY_MARSEILLE, SAMPLE_CITY_PARIS} from '../../../testing/city.constant';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AddReservationComponent', () => {
  let component: SearchJourneyComponent;
  let fixture: ComponentFixture<SearchJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchJourneyComponent],
      imports: [ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatNativeDateModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchJourneyComponent);
    component = fixture.componentInstance;
    component.cities = [SAMPLE_CITY_PARIS, SAMPLE_CITY_MARSEILLE];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set cities when input cities is set', () => {
    expect(component.departureCities).toEqual([SAMPLE_CITY_PARIS, SAMPLE_CITY_MARSEILLE]);
    expect(component.arrivalCities).toEqual([SAMPLE_CITY_PARIS, SAMPLE_CITY_MARSEILLE]);
  });

  it('should switch departure and arrival cities when switchCities is called', () => {
    const initialDeparture = component.form.get(component.DEPARTURE_FORM_KEY)?.value;
    const initialArrival = component.form.get(component.ARRIVAL_FORM_KEY)?.value;

    component.switchCities();

    expect(component.form.get(component.DEPARTURE_FORM_KEY)?.value).toEqual(initialArrival);
    expect(component.form.get(component.ARRIVAL_FORM_KEY)?.value).toEqual(initialDeparture);
  });

  it('should emit searchJourney event when search is called', () => {
    spyOn(component.searchJourney, 'emit');

    component.form.setValue({
      [component.DEPARTURE_FORM_KEY]: SAMPLE_CITY_PARIS,
      [component.ARRIVAL_FORM_KEY]: SAMPLE_CITY_MARSEILLE,
      [component.DATE_FORM_KEY]: new Date(),
      [component.SEATS_FORM_KEY]: 2,
    });

    component.search();

    const expectedSearchJourney = component.form.value;
    expect(component.searchJourney.emit).toHaveBeenCalledWith(expectedSearchJourney);
  });

});
