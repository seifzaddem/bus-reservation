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
import {HomeComponent} from './pages/home/home.component';
import {SearchJourneyComponent} from './component/search-journey/search-journey.component';
import {SearchJourneyResultComponent} from './component/search-journey-result/search-journey-result.component';
import {ReservationComponent} from './component/reservation/reservation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {JourneyComponent} from './component/journey/journey.component';
import {UnpaidReservationComponent} from './component/unpaid-reservation/unpaid-reservation.component';
import {MatTableModule} from '@angular/material/table';
import {
  CreditCardPaymentModalComponent
} from './component/credit-card-payment-modal/credit-card-payment-modal.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    HomeComponent,
    SearchJourneyComponent,
    SearchJourneyResultComponent,
    ReservationComponent,
    JourneyComponent,
    UnpaidReservationComponent,
    CreditCardPaymentModalComponent
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
    FormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class CoreModule {
}
