import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JourneyComponent} from './journey.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CityService} from '../../service/city.service';
import {JourneyService} from '../../service/journey.service';
import {ReservationService} from '../../service/reservation.service';
import {of} from 'rxjs';
import {SAMPLE_CITY_MARSEILLE, SAMPLE_CITY_PARIS} from '../../../testing/city.constant';
import {
  SAMPLE_JOURNEY_MODEL,
  SAMPLE_RESERVED_JOURNEY_MODEL,
  SAMPLE_SEARCH_JOURNEY_MODEL
} from '../../../testing/journey.constant';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('JourneyComponent', () => {
  let component: JourneyComponent;
  let fixture: ComponentFixture<JourneyComponent>;
  let journeyServiceSpy: SpyObj<JourneyService>;
  let reservationServiceSpy: SpyObj<ReservationService>;
  let cityServiceSpy: SpyObj<CityService>;

  beforeEach(async () => {
    cityServiceSpy = createSpyObj('CityService', ['getCities']);
    journeyServiceSpy = createSpyObj('JourneyService', ['getJourneysBySearchCriteria', 'updateJourney', 'getJourneyNotification']);
    reservationServiceSpy = createSpyObj('ReservationService', ['addReservedJourney', 'notifyUnpaidReservations']);
    journeyServiceSpy.getJourneyNotification.and.returnValue(of(null));
    journeyServiceSpy.getJourneysBySearchCriteria.and.returnValue(of([SAMPLE_JOURNEY_MODEL]));
    journeyServiceSpy.updateJourney.and.returnValue(of(null));
    await TestBed.configureTestingModule({
      declarations: [JourneyComponent],
      imports: [HttpClientTestingModule,
        MatSnackBarModule], providers: [
        {provide: CityService, useValue: cityServiceSpy},
        {provide: JourneyService, useValue: journeyServiceSpy},
        {provide: ReservationService, useValue: reservationServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cities on initialization', () => {
    cityServiceSpy.getCities.and.returnValue(of([SAMPLE_CITY_PARIS, SAMPLE_CITY_MARSEILLE]));

    fixture.detectChanges();

    expect(cityServiceSpy.getCities).toHaveBeenCalled();
  });

  it('should correctly search journeys', () => {
    component.searchJourney(SAMPLE_SEARCH_JOURNEY_MODEL);

    expect(journeyServiceSpy.getJourneysBySearchCriteria).toHaveBeenCalled();
  });

  it('should reserve a journey', () => {
    const reservedJourneyModel = SAMPLE_RESERVED_JOURNEY_MODEL;
    journeyServiceSpy.updateJourney.and.returnValue(of(null));
    reservationServiceSpy.addReservedJourney.and.returnValue(of(null));

    component.reserveJourney(reservedJourneyModel);

    expect(journeyServiceSpy.updateJourney).toHaveBeenCalledWith(reservedJourneyModel);
    expect(reservationServiceSpy.addReservedJourney).toHaveBeenCalledWith(reservedJourneyModel);
  });
});
