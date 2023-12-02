import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJourneyResultComponent } from './search-journey-result.component';

describe('SearchJourneyResultComponent', () => {
  let component: SearchJourneyResultComponent;
  let fixture: ComponentFixture<SearchJourneyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchJourneyResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchJourneyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
