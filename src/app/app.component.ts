import {Component} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter
    }
  ]

})
export class AppComponent {
}
