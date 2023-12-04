import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JourneyComponent} from './journey.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('JourneyComponent', () => {
  let component: JourneyComponent;
  let fixture: ComponentFixture<JourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JourneyComponent],
      imports: [HttpClientTestingModule,
        MatSnackBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
