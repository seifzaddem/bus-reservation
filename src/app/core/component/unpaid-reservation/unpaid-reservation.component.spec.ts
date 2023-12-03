import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnpaidReservationComponent} from './unpaid-reservation.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
