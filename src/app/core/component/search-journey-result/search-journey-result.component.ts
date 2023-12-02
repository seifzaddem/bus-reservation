import {Component, Input, OnInit} from '@angular/core';
import {JourneyModel} from '../../model/journey.model';
import {FormControl} from '@angular/forms';
import {JsonParserService} from '../../../shared/service/json-parser.service';

@Component({
  selector: 'app-search-journey-result',
  templateUrl: './search-journey-result.component.html',
  styleUrls: ['./search-journey-result.component.scss']
})
export class SearchJourneyResultComponent implements OnInit {


  departure: FormControl<string>;
  arrival: FormControl<string>;
  date: FormControl<Date>;
  availableSeats: FormControl<number>;
  price: FormControl<number>;

  constructor(private jsonParserService: JsonParserService) {
  }

  _journey: JourneyModel;

  @Input()
  set journey(journeyModel: JourneyModel) {
    this._journey = journeyModel;
    this.departure = new FormControl<string>(journeyModel.departure.name);
    this.arrival = new FormControl<string>(journeyModel.arrival.name);
    this.date = new FormControl<Date>(journeyModel.date);
    this.availableSeats = new FormControl<number>(journeyModel.availableSeats);
    this.price = new FormControl<number>(journeyModel.price);
  }

  ngOnInit(): void {
  }

  addJourneyToReservations() {
    // let unparsedReservations = localStorage.getItem("reservations");
    // let reservations
    // if (!unparsedReservations) {
    //   localStorage.setItem("reservations", JSON.stringify([this._journey]));
    // } else {
    //   this.jsonParserService.parseString(unparsedReservations)
    // }

  }
}
