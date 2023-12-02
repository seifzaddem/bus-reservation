import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {JourneyComponent} from './pages/journey/journey.component';
import {SearchJourneyComponent} from './component/search-journey/search-journey.component';
import {SearchJourneyResultComponent} from './component/search-journey-result/search-journey-result.component';
import {ReservationComponent} from './pages/reservation/reservation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    JourneyComponent,
    SearchJourneyComponent,
    SearchJourneyResultComponent,
    ReservationComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule
  ]
})
export class CoreModule {
}
