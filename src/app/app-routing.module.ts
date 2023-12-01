import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddReservationComponent} from './core/pages/add-reservation/add-reservation.component';

const routes: Routes = [
  {path: '', component: AddReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
