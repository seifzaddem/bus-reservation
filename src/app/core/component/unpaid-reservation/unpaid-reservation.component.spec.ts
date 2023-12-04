import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnpaidReservationComponent} from './unpaid-reservation.component';
import {SAMPLE_UNPAID_RESERVATION_MODEL} from '../../../testing/reservation.constant';
import {SAMPLE_RESERVED_JOURNEY_MODEL} from '../../../testing/journey.constant';

describe('PendingReservationComponent', () => {
  let component: UnpaidReservationComponent;
  let fixture: ComponentFixture<UnpaidReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnpaidReservationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UnpaidReservationComponent);
    component = fixture.componentInstance;
    component.reservation = SAMPLE_UNPAID_RESERVATION_MODEL;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit OnDeleteJourney event when deleteJourney is called', () => {
    const reservedJourney = SAMPLE_RESERVED_JOURNEY_MODEL
    spyOn(component.OnDeleteJourney, 'emit');

    component.deleteJourney(reservedJourney);

    expect(component.OnDeleteJourney.emit).toHaveBeenCalledWith(reservedJourney);
  });

  it('should return true from areJourneysReserved if reservedJourneys is not undefined and has length greater than 0', () => {
    component.reservation.reservedJourneys = [SAMPLE_RESERVED_JOURNEY_MODEL];

    const result = component.areJourneysReserved();

    expect(result).toBe(true);
  });

  it('should return false from areJourneysReserved if reservedJourneys is undefined', () => {
    component.reservation.reservedJourneys = undefined;

    const result = component.areJourneysReserved();

    expect(result).toBe(false);
  });

  it('should return false from areJourneysReserved if reservedJourneys has length 0', () => {
    component.reservation.reservedJourneys = [];

    const result = component.areJourneysReserved();

    expect(result).toBe(false);
  });

  it('should emit onCreditCardPayment event when openCreditCardPaymentModal is called', () => {
    spyOn(component.onCreditCardPayment, 'emit');

    component.openCreditCardPaymentModal();

    expect(component.onCreditCardPayment.emit).toHaveBeenCalled();
  });

  it('should emit onPaypalPayment event when openPaypalPaymentModal is called', () => {
    spyOn(component.onPaypalPayment, 'emit');

    component.openPaypalPaymentModal();

    expect(component.onPaypalPayment.emit).toHaveBeenCalled();
  });
});
