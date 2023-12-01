import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddReservationComponent} from './pages/add-reservation/add-reservation.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AddReservationComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class CoreModule {
}
