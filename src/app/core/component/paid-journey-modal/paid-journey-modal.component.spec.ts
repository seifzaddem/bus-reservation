import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaidJourneyModalComponent} from './paid-journey-modal.component';
import {PaidJourneyWrapper} from '../../model/journey.model';
import {SAMPLE_RESERVED_JOURNEY_MODEL} from '../../../testing/journey.constant';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('PaidJourneyComponent', () => {
  let component: PaidJourneyModalComponent;
  let fixture: ComponentFixture<PaidJourneyModalComponent>;
  const matDialogData: PaidJourneyWrapper = {
    reservedJourneys: [SAMPLE_RESERVED_JOURNEY_MODEL],
    totalPrice: 50
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaidJourneyModalComponent],
      providers: [{provide: MAT_DIALOG_DATA, useValue: matDialogData}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaidJourneyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
