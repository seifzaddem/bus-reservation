import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddReservationComponent} from './pages/add-reservation/add-reservation.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ReservationComponent } from './pages/reservation/reservation.component';


@NgModule({
  declarations: [
    AddReservationComponent,
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
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule
  ]
})
export class CoreModule {
}
