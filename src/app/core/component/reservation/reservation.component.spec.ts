import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationComponent} from './reservation.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;
  let dialogSpy: SpyObj<MatDialog>;
  const dialogRef: SpyObj<MatDialogRef<any, unknown>> = createSpyObj('MatDialogRef', ['close', 'open', 'afterClosed']);

  beforeEach(async () => {
    dialogSpy = createSpyObj<MatDialog>(['open']);
    dialogSpy.open.and.returnValue(dialogRef);

    await TestBed.configureTestingModule({
      declarations: [ReservationComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: MatDialog, useValue: dialogSpy}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
