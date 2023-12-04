import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaidReservationComponent} from './paid-reservation.component';

describe('PaidReservationComponent', () => {
  let component: PaidReservationComponent;
  let fixture: ComponentFixture<PaidReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaidReservationComponent]

    })
      .compileComponents();

    fixture = TestBed.createComponent(PaidReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
