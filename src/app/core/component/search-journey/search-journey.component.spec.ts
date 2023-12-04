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
    component._cities = [SAMPLE_CITY_PARIS, SAMPLE_CITY_MARSEILLE];
    component.departureCities = [SAMPLE_CITY_PARIS, SAMPLE_CITY_MARSEILLE];
    component.arrivalCities = [SAMPLE_CITY_PARIS, SAMPLE_CITY_MARSEILLE];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
