import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketBookingComponent } from './CMP/ticket-booking/ticket-booking.component';

const routes: Routes = [
  { path: '', component: TicketBookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
