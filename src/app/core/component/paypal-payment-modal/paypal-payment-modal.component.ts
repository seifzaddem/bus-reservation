import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReservationModelModalWrapper} from '../../model/reservation.model';
import {PaymentService} from '../../service/payment.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import {tap} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-paypal-payment-modal',
  templateUrl: './paypal-payment-modal.component.html',
  styleUrls: ['./paypal-payment-modal.component.scss']
})
export class PaypalPaymentModalComponent implements OnInit {

  mailControl = new FormControl<string>(null, [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReservationModelModalWrapper,
              private paymentService: PaymentService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PaypalPaymentModalComponent>) {
  }

  ngOnInit(): void {
  }

  executePayment() {
    this.paymentService.payByPaypal(this.mailControl.value).pipe(
      tap(() => {
        this.snackBar.open("Paiement par paypal effectué avec succès", "X", {
          horizontalPosition: "right",
          verticalPosition: "top",
        })
        this.dialogRef.close(true);
      }),
      untilDestroyed(this)
    ).subscribe();
  }

}
