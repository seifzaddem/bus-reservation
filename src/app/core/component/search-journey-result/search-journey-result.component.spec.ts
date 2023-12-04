import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchJourneyResultComponent} from './search-journey-result.component';
import {SAMPLE_JOURNEY_MODEL} from '../../../testing/journey.constant';
import {SAMPLE_CLIENT} from '../../../testing/client.constant';

describe('SearchJourneyResultComponent', () => {
  let component: SearchJourneyResultComponent;
  let fixture: ComponentFixture<SearchJourneyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchJourneyResultComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchJourneyResultComponent);
    component = fixture.componentInstance;
    component.journey = SAMPLE_JOURNEY_MODEL;
    component.client = SAMPLE_CLIENT;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form controls when journey is set', () => {
    expect(component.departure.value).toBe(SAMPLE_JOURNEY_MODEL.departure.name);
    expect(component.arrival.value).toBe(SAMPLE_JOURNEY_MODEL.arrival.name);
    expect(component.date.value).toBe(SAMPLE_JOURNEY_MODEL.date);
    expect(component.availableSeats.value).toBe(SAMPLE_JOURNEY_MODEL.availableSeats);
    expect(component.price.value).toBe(SAMPLE_JOURNEY_MODEL.price);
  });

  it('should emit reserveJourney when triggerReservation is called', () => {
    spyOn(component.reserveJourney, 'emit');

    component.seats = 2;
    component.triggerReservation();

    const expectedReservedJourney = {
      id: jasmine.any(String),
      journey: SAMPLE_JOURNEY_MODEL,
      seats: 2,
      clientId: component.client.id,
    };
    expect(component.reserveJourney.emit).toHaveBeenCalledWith(expectedReservedJourney);
  });
});
